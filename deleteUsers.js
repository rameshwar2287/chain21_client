// MongoDB Script - Delete all users except Shaha (8539068184)
const { MongoClient } = require('mongodb');

const MONGO_URI = 'mongodb://localhost:27017'; // Update with your MongoDB URI
const DB_NAME = 'your_database_name'; // Update with your database name
const COLLECTION_NAME = 'users'; // Update with your collection name

async function deleteUsers() {
  const client = new MongoClient(MONGO_URI);
  
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
    
    const result = await collection.deleteMany({
      $and: [
        { username: { $ne: 'Shaha' } },
        { mobile: { $ne: '8539068184' } }
      ]
    });
    
    console.log(`✓ Deleted ${result.deletedCount} users`);
    console.log('✓ User "Shaha" (8539068184) preserved');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.close();
  }
}

deleteUsers();
