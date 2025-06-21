const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vizora', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User schema (simplified for migration)
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  role: String,
  isBlocked: Boolean,
  lastActive: { type: Date, default: Date.now },
  createdAt: Date,
  updatedAt: Date
});

const User = mongoose.model('User', userSchema);

async function migrateUsers() {
  try {
    console.log('Starting user migration...');
    
    // Find all users without lastActive field
    const users = await User.find({ lastActive: { $exists: false } });
    console.log(`Found ${users.length} users without lastActive field`);
    
    // Update each user to add lastActive field
    for (const user of users) {
      user.lastActive = new Date();
      await user.save();
      console.log(`Updated user: ${user.email}`);
    }
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    mongoose.connection.close();
  }
}

migrateUsers(); 