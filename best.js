const fs = require('fs');

function generateUserId(userName) {
  let counter = 1000; // Initialize counter variable

  // Check if counter file exists
  if (fs.existsSync('counter.txt')) {
    // If the file exists, read the counter value from it
    const counterData = fs.readFileSync('counter.txt', 'utf-8');
    counter = parseInt(counterData);
  }

  const userId = `${counter}-${userName}`;
  counter++; // Increment the counter for the next userId

  // Save the updated counter value to the file
  fs.writeFileSync('counter.txt', counter.toString(), 'utf-8');

  return userId;
}

// Example usage
const userName = 'exampleUser123';
const userId = generateUserId(userName);
console.log(userId);
