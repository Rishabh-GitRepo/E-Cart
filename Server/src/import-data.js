// import-data.js
const { MongoClient, ObjectId } = require('mongodb');
const fs = require('fs');
const path = require('path');

const uri = process.env.DB_URL || 'mongodb://localhost:27017/flashtrade';
const client = new MongoClient(uri);

const imports = [
  { col: 'users', file: 'SampleUsers.json' },
  { col: 'categories', file: 'SampleCategoory.json' },
  { col: 'products', file: 'SampleProduts.json' },
  { col: 'commissionrules', file: 'SampleCommissionRules.json' },
  { col: 'orders', file: 'SampleOrders.json' },
  { col: 'customerreviews', file: 'SampleReviews.json' },
  { col: 'customermessages', file: 'SampeCustomerMessage .json' },
];

async function run() {
  try {
    await client.connect();
    const db = client.db();

    for (const item of imports) {
      const collection = db.collection(item.col);
      
      // Drop collection if it exists to avoid duplicate/id conflicts
      try {
        await collection.drop();
      } catch (err) {
        // Ignored if collection does not exist yet
      }

      const filePath = path.resolve(__dirname, 'db', item.file);
      const rawData = fs.readFileSync(filePath, 'utf-8');
      let docs = JSON.parse(rawData);

      // Convert MongoDB Extended JSON ($oid, $date) to proper BSON types
      function convertExtendedJSON(value) {
        if (Array.isArray(value)) return value.map(convertExtendedJSON);
        if (value && typeof value === 'object') {
          // ObjectId
          if (Object.prototype.hasOwnProperty.call(value, '$oid') && Object.keys(value).length === 1) {
            return new ObjectId(value.$oid);
          }
          // Date
          if (Object.prototype.hasOwnProperty.call(value, '$date')) {
            const d = value.$date;
            if (typeof d === 'string') return new Date(d);
            if (d && typeof d === 'object' && Object.prototype.hasOwnProperty.call(d, '$numberLong')) {
              return new Date(Number(d.$numberLong));
            }
            return new Date(d);
          }
          const out = {};
          for (const k of Object.keys(value)) {
            out[k] = convertExtendedJSON(value[k]);
          }
          return out;
        }
        return value;
      }

      if (Array.isArray(docs) && docs.length > 0) {
        docs = docs.map(convertExtendedJSON);
        await collection.insertMany(docs);
        console.log(`✓ Imported ${docs.length} docs into ${item.col}`);
      }
    }
    console.log('All imports completed successfully.');
  } finally {
    await client.close();
  }
}

run().catch(console.error);