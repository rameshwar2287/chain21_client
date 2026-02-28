// Safe Version - Shows users to be deleted before confirmation
const { MongoClient } = require('mongodb');
const readline = require('readline');

const MONGO_URI = 'mongodb://localhost:27017';
const DB_NAME = 'your_database_name';
const COLLECTION_NAME = 'users';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function deleteUsers() {
  const client = new MongoClient(MONGO_URI);
  
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
    
    const usersToDelete = await collection.find({
      $and: [
        { username: { $ne: 'Shaha' } },
        { mobile: { $ne: '8539068184' } }
      ]
    }).toArray();
    
    console.log(`\n⚠️  ${usersToDelete.length} users will be deleted:`);
    usersToDelete.forEach(u => console.log(`  - ${u.username} (${u.mobile})`));
    
    rl.question('\nType "DELETE" to confirm: ', async (answer) => {
      if (answer === 'DELETE') {
        const result = await collection.deleteMany({
          $and: [
            { username: { $ne: 'Shaha' } },
            { mobile: { $ne: '8539068184' } }
          ]
        });
        console.log(`\n✓ Deleted ${result.deletedCount} users`);
      } else {
        console.log('\n✗ Operation cancelled');
      }
      rl.close();
      await client.close();
    });
    
  } catch (error) {
    console.error('Error:', error.message);
    rl.close();
    await client.close();
  }
}

deleteUsers();
