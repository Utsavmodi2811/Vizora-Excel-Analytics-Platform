require('dotenv').config();
const mongoose = require('mongoose');

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

async function showPassword() {
  try {
    console.log('🔍 Showing password details...\n');
    
    const user = await User.findOne({ email: 'utsavmodi1128@gmail.com' });
    
    if (user) {
      console.log('User found:');
      console.log(`  Name: ${user.name}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Password value: "${user.password}"`);
      console.log(`  Password length: ${user.password ? user.password.length : 0}`);
      console.log(`  Is bcrypt hash: ${user.password ? user.password.startsWith('$2b$') : false}`);
      console.log(`  Role: ${user.role}`);
    } else {
      console.log('User not found');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

showPassword(); 