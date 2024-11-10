import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { dbconnect, Pet, Request,Success } from './dbconnect.js'; // Combine imports from dbconnect.js
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import nodemailer from 'nodemailer';

const app = express();
const port = process.env.PORT || 5000;

// Resolve __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'pet-platform', 'pet', 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Connect to the database
dbconnect();

// Middleware
app.use(cors());
app.use(express.json());

// Serve images from the 'uploads' directory
app.use('/uploads', express.static(uploadDir));

// Set up multer with storage configuration and file format restriction
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only .jpg, .jpeg, and .png formats are allowed!'), false);
    }
  },
});

// Route to handle form submission with image upload
app.post('/pets', upload.single('image'), async (req, res) => {
  const { name, age, type, breed ,mediDescription} = req.body;
  const imagePath = req.file ? req.file.path : null;

  try {
    const newPet = new Pet({
      name,
      age,
      type,
      breed,
      mediDescription,
      image: imagePath,
    });

    await newPet.save();
    console.log('New pet added:', newPet);
    res.status(201).json({ message: 'Pet added successfully', pet: newPet });
  } catch (error) {
    console.error('Error adding pet:', error.message);
    res.status(500).json({ message: 'Error adding pet', error: error.message });
  }
});

// Get all pets with optional filtering
app.get('/petlist', async (req, res) => {
  const { search, type } = req.query;

  try {
    let filter = {};

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    if (type) {
      filter.type = type;
    }

    const pets = await Pet.find(filter);
    console.log("Filtered PETS:", pets);

    res.status(200).json(pets);
  } catch (error) {
    console.error('Error fetching pets:', error.message);
    res.status(500).json({ message: 'Error fetching pets', error: error.message });
  }
});

// Get a single pet by ID
app.get('/petlist/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json(pet);
  } catch (error) {
    console.error('Error fetching pet:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Handle request submissions
app.post('/request', async (req, res) => {
  try {
    const { name, contact, email, petId } = req.body;

    const newRequest = new Request({
      name,
      contact,
      email,
      petId,
    });

    await newRequest.save();

    console.log(`Request saved for pet ID ${petId} from ${name}`);
    res.status(200).json({
      message: 'Request sent successfully',
      request: newRequest,
    });
  } catch (error) {
    console.error('Error processing request:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});



// Fetch all requests
app.get('/getrequests', async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get multiple pets by IDs
app.get('/getpetlist', async (req, res) => {
  const petIds = req.query.ids.split(',');

  try {
    const pets = await Pet.find({ '_id': { $in: petIds } });
    res.json(pets);
  } catch (err) {
    console.error('Error fetching pets:', err);
    res.status(500).send('Error fetching pets');
  }
});

// Send email
const sendEmail = async (userEmail, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: process.env.USER,
      to: userEmail,
      subject,
      text,
    };

    console.log('Sending email...');
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};

app.post('/send-mail', async (req, res) => {
  const { userEmail, petName} = req.body;

  if (!userEmail || !petName) {
    return res.status(400).send('Missing required fields: userEmail or petName');
  }

  try {
    const subject = "Request for Pet Adoption";
    const text = `Your request for the pet ${petName} has been accepted.`;
    await sendEmail(userEmail, subject, text);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Error sending email');
  }
});

app.post('/mark-success', async (req, res) => {
  const { requestId, petId } = req.body;
  console.log(requestId);

  try {

    // Fetch and delete the request and pet documents
    const request = await Request.findById(requestId);
    const pet = await Pet.findById(petId);

    const requestp = await Request.findByIdAndDelete(requestId);
    const petp = await Pet.findByIdAndDelete(petId);
    
    console.log(request);
    console.log(pet);

    // Save to success collection if both documents exist
    if (request && pet) {
      const successEntry = new Success({
        request,
        pet,
      });
      await successEntry.save();
      res.status(200).json({ message: 'Request and pet moved to success collection' });
    } else {
      res.status(404).json({ message: 'Request or pet not found' });
    }
  } catch (error) {
    console.error('Error moving to success collection:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all entries from success collection
app.get('/getSuccessEntries', async (req, res) => {
  try {
    const successEntries = await Success.find();
    res.status(200).json(successEntries);
  } catch (error) {
    console.error('Error fetching success entries:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
