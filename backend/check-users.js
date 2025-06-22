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

async function checkUsers() {
  try {
    console.log('🔍 Checking users in database...\n');
    
    const users = await User.find({});
    console.log(`Found ${users.length} users:\n`);
    
    users.forEach((user, index) => {
      console.log(`User ${index + 1}:`);
      console.log(`  Name: ${user.name}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Password: ${user.password ? (user.password.startsWith('$2b$') ? 'HASHED' : 'PLAIN TEXT') : 'MISSING'}`);
      console.log(`  Role: ${user.role}`);
      console.log(`  Blocked: ${user.isBlocked}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

checkUsers(); 