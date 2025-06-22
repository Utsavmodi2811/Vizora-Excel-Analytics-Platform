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

async function checkUserDetails() {
  try {
    console.log('🔍 Checking user details...\n');
    
    const user = await User.findOne({ email: 'utsavmodi1128@gmail.com' });
    
    if (user) {
      console.log('User found:');
      console.log(`  Name: ${user.name}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Password: ${user.password ? (user.password.startsWith('$2b$') ? 'HASHED' : 'PLAIN TEXT') : 'MISSING'}`);
      console.log(`  Password length: ${user.password ? user.password.length : 0}`);
      console.log(`  Password starts with $2b$: ${user.password ? user.password.startsWith('$2b$') : false}`);
      console.log(`  Password preview: ${user.password ? user.password.substring(0, 20) + '...' : 'N/A'}`);
      console.log(`  Role: ${user.role}`);
      console.log(`  Blocked: ${user.isBlocked}`);
    } else {
      console.log('User not found');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

checkUserDetails(); 