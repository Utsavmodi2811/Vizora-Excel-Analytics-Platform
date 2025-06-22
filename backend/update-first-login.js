const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vizora')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// User schema (simplified for this script)
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  role: String,
  isBlocked: Boolean,
  lastActive: Date,
  emailNotifications: Boolean,
  isFirstLogin: Boolean
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

async function updateFirstLoginField() {
  try {
    console.log('Updating existing users to have isFirstLogin field...');
    
    // Update all users that don't have isFirstLogin field
    const result = await User.updateMany(
      { isFirstLogin: { $exists: false } },
      { $set: { isFirstLogin: true } }
    );
    
    console.log(`Updated ${result.modifiedCount} users with isFirstLogin field`);
    
    // Show all users
    const users = await User.find({}, 'name email isFirstLogin createdAt');
    console.log('\nAll users:');
    users.forEach(user => {
      console.log(`- ${user.name} (${user.email}): isFirstLogin = ${user.isFirstLogin}`);
    });
    
  } catch (error) {
    console.error('Error updating users:', error);
  } finally {
    mongoose.connection.close();
  }
}

updateFirstLoginField(); 