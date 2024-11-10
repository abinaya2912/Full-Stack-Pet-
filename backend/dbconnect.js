import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

// Define Pet schema and model
const petSchema = new mongoose.Schema({
  name: String,
  age: Number,
  type: String,
  breed: String,
  mediDescription: String,
  image: String, // Store image URL or base64 string if using inline images
});

const Pet = mongoose.model('Pet', petSchema);


const requestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  email:{type: String, required: true},
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);


const successSchema = new mongoose.Schema({
  request: {
    type: Object,
    required: true,
  },
  pet: {
    type: Object,
    required: true,
  },
  successDate: {
    type: Date,
    default: Date.now,
  },
});

const Success = mongoose.model('Success', successSchema);


export { dbconnect, Pet, Request ,Success};

