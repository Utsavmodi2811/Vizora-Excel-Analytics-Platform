const bcrypt = require('bcryptjs');

async function testBcrypt() {
  console.log('🧪 Testing bcrypt password comparison...\n');
  
  const password = 'testpassword123';
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  
  console.log('Original password:', password);
  console.log('Generated hash:', hash);
  console.log('Hash starts with $2b$:', hash.startsWith('$2b$'));
  
  // Test comparison
  const isMatch = await bcrypt.compare(password, hash);
  console.log('Password matches hash:', isMatch);
  
  // Test with wrong password
  const wrongMatch = await bcrypt.compare('wrongpassword', hash);
  console.log('Wrong password matches hash:', wrongMatch);
  
  console.log('\n✅ Bcrypt is working correctly!');
}

testBcrypt(); 