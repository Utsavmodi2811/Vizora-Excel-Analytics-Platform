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

async function fixPasswords() {
  try {
    console.log('🔧 Fixing user passwords...\n');
    
    const users = await User.find({});
    console.log(`Found ${users.length} users to check.\n`);
    
    for (const user of users) {
      // Check if password is already hashed
      if (user.password && !user.password.startsWith('$2b$')) {
        console.log(`Fixing password for user: ${user.name} (${user.email})`);
        
        // Hash the plain text password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        
        // Update the user with hashed password
        await User.findByIdAndUpdate(user._id, { password: hashedPassword });
        console.log(`✅ Password hashed for ${user.email}\n`);
      } else {
        console.log(`✅ Password already hashed for ${user.email}\n`);
      }
    }
    
    console.log('🎉 All passwords have been fixed!');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

fixPasswords(); 