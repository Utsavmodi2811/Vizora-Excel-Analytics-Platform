require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/excel-analytics');

// Define User schema (simplified)
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  isBlocked: Boolean
});

const User = mongoose.model('User', userSchema);

async function resetUserPassword() {
  try {
    console.log('🔧 Resetting user password...\n');
    
    const email = 'utsavmodi1128@gmail.com';
    const newPassword = '1234567'; // Your actual password
    
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('❌ User not found');
      return;
    }
    
    console.log(`Found user: ${user.name} (${user.email})`);
    
    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update the user's password
    await User.findByIdAndUpdate(user._id, { password: hashedPassword });
    
    console.log(`✅ Password reset successfully!`);
    console.log(`New password: ${newPassword}`);
    console.log(`Hashed password: ${hashedPassword}`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

resetUserPassword(); 