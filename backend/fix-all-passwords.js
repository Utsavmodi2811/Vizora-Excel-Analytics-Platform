const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vizora')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// User schema
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

async function fixAllPasswords() {
  try {
    console.log('🔧 Fixing all user passwords...\n');
    
    // Get all users
    const users = await User.find({});
    console.log(`Found ${users.length} users in database:\n`);
    
    // Reset password for each user
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const newPassword = 'password123'; // Same password for all users
      
      console.log(`${i + 1}. ${user.name} (${user.email})`);
      console.log(`   Current password: ${user.password.length > 20 ? 'HASHED' : 'PLAIN TEXT'}`);
      
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      
      // Update the user
      await User.findByIdAndUpdate(user._id, {
        password: hashedPassword,
        isFirstLogin: true // Reset first login flag
      });
      
      console.log(`   ✅ Password reset to: ${newPassword}`);
      console.log(`   ✅ isFirstLogin set to: true\n`);
    }
    
    console.log('🎉 All passwords have been reset!');
    console.log('\n📋 Login Credentials:');
    console.log('=====================');
    users.forEach((user, index) => {
      console.log(`${index + 1}. Email: ${user.email}`);
      console.log(`   Password: password123`);
      console.log(`   Role: ${user.role}\n`);
    });
    
  } catch (error) {
    console.error('❌ Error fixing passwords:', error);
  } finally {
    mongoose.connection.close();
  }
}

fixAllPasswords(); 