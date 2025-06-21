const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vizora', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  role: String,
  isBlocked: Boolean,
  lastActive: Date,
  createdAt: Date,
  updatedAt: Date
});

const User = mongoose.model('User', userSchema);

async function makeAdmin() {
  try {
    console.log('Checking users in database...');
    
    // List all users
    const users = await User.find({});
    console.log('\nAll users in database:');
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.email} - Role: ${user.role} - Name: ${user.name}`);
    });
    
    // Ask which user to make admin
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.question('\nEnter the email of the user you want to make admin: ', async (email) => {
      try {
        const user = await User.findOne({ email: email });
        
        if (!user) {
          console.log('User not found!');
          rl.close();
          mongoose.connection.close();
          return;
        }
        
        console.log(`\nFound user: ${user.name} (${user.email})`);
        console.log(`Current role: ${user.role}`);
        
        // Update user to admin
        user.role = 'admin';
        await user.save();
        
        console.log(`✅ Successfully updated ${user.email} to admin role!`);
        
        // Verify the update
        const updatedUser = await User.findOne({ email: email });
        console.log(`\nVerification - New role: ${updatedUser.role}`);
        
      } catch (error) {
        console.error('Error updating user:', error);
      } finally {
        rl.close();
        mongoose.connection.close();
      }
    });
    
  } catch (error) {
    console.error('Error:', error);
    mongoose.connection.close();
  }
}

makeAdmin(); 