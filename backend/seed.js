// seed.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import User from './models/user.model.js'
import Complaint from './models/complaint.model.js';

const MONGO_URI = 'mongodb://localhost:27017/complaintDB'; // change this

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('DB connected');

    // Create a user
    const hashedPassword = await bcrypt.hash('test1234', 10);
    const user = await User.create({
      displayName: 'john doe',
      email: 'john@example.com',
      hashedPassword,
    });

    // Fixed previous month date
    const createdAt = new Date('2025-04-15T10:00:00Z');

    // Create complaints for different statuses
    const complaints = [
      {
        description: 'Mess food quality is poor',
        category: 'mess',
        status: 'pending',
        createdBy: user._id,
        updatedBy: user._id,
        createdAt,
        updatedAt: createdAt,
      },
      {
        description: 'Hostel Wi-Fi not working',
        category: 'hostel',
        status: 'resolved',
        createdBy: user._id,
        updatedBy: user._id,
        createdAt,
        updatedAt: createdAt,
      },
      {
        description: 'Need more medical supplies',
        category: 'medical',
        status: 'inprogress',
        createdBy: user._id,
        updatedBy: user._id,
        createdAt,
        updatedAt: createdAt,
      },
    ];

    await Complaint.insertMany(complaints);
    console.log('Complaints seeded for previous month.');

    mongoose.connection.close();
  } catch (err) {
    console.error('Seeding error:', err);
    mongoose.connection.close();
  }
};

seedData();
