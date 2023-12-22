const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
// middleware
app.use(cors());
app.use(express.json());
// ph-job
// zPvuywgYyeoVbvQM



const uri = "mongodb+srv://ph-job:zPvuywgYyeoVbvQM@cluster0.fohhaen.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const todoCollection = client.db("todoDB").collection("todo");

    app.post("/api/v1/todo", async (req, res) => {
      try {
        const data = req.body;
        const result = await todoCollection.insertOne(data);
        res.send({ status: true });
      } catch (error) {
        res.send({ status: false });
      }
    });

    app.get("/api/v1/todo", async (req, res) => {
      try {
        const result = await todoCollection.find().toArray();
        res.send({ status: true, data: result });
      } catch (error) {
        res.send({ status: false, data: [] });
      }
    });
    app.get("/api/v1/todo/:id", async (req, res) => {
      try {
        const id = req.params.id;

        const query = { _id: new ObjectId(id) };
        const result = await todoCollection.findOne(query);
        res.send({ status: true, data: result });
      } catch (error) {
        res.send({ status: false, data: {} });
      }
    });

    app.patch("/api/v1/todo/:id", async (req, res) => {
      try {
        const id = req.params.id;

        const query = { _id: new ObjectId(id) };
        const data = req.body;
        const updateDoc = {
          $set: data,
        };
        const result = await todoCollection.updateOne(query, updateDoc);
        res.send({ status: true });
      } catch (error) {
        res.send({ status: false });
      }
    });
    app.delete("/api/v1/todo/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        console.log(id);
        const result = await todoCollection.deleteOne(query);
        res.send({ status: true });
      } catch (error) {
        res.send({ status: false });
      }
    });



    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/' , (req , res) => {
    res.send('running this site')
})

app.listen(port , () => {
    console.log(`Ph Task is running on port ${port}`)
})