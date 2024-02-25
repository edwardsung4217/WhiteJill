import express from 'express';
const {MongoClient, ServerApiVersion} = require('mongodb');
require('dotenv').config();
const uri = process.env.CONNECTION


const router = express.Router();

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  


type EmojiResponse = string[];

router.get<{}, EmojiResponse>('/', (req, res) => {
    async function run() {
        try {
            // Connect to the Atlas cluster
             await client.connect();
             // Get the database and collection on which to run the operation
             const db = client.db("gettingStarted");
             const col = db.collection("people");
             // Create new documents                                                                                                                                         
            //  const peopleDocuments = [
            //    {
            //      "name": { "first": "Alan", "last": "Turing" },
            //      "birth": new Date(1912, 5, 23), // May 23, 1912                                                                                                                                 
            //      "death": new Date(1954, 5, 7),  // May 7, 1954                                                                                                                                  
            //      "contribs": [ "Turing machine", "Turing test", "Turingery" ],
            //      "views": 1250000
            //    },
            //    {
            //      "name": { "first": "Grace", "last": "Hopper" },
            //      "birth": new Date(1906, 12, 9), // Dec 9, 1906                                                                                                                                 
            //      "death": new Date(1992, 1, 1),  // Jan 1, 1992                                                                                                                                  
            //      "contribs": [ "Mark I", "UNIVAC", "COBOL" ],
            //      "views": 3860000
            //    }
            //  ]
            //  // Insert the documents into the specified collection        
            //  const p = await col.insertMany(peopleDocuments);
             // Find the document
             const filter = { "name.last": "Turing" };
             const document = await col.findOne(filter);
             // Print results
             console.log("Document found:\n" + JSON.stringify(document));
             res.json(document)
            } catch (err) {
        }finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});

export default router;
