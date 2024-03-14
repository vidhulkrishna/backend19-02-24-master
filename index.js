const express = require("express");
const cors = require("cors");
const multer = require('multer');
const mongoose = require("mongoose");

// Import the Build model
const BuildModel = require('./model/Build');

// Connect to MongoDB
mongoose.connect("mongodb+srv://dephin16:thejuspuli@cluster0.fxbesy7.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("DB connected");
}).catch(err => console.log(err));

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.get('/builds', async (request, response) => {
  try {
    // Fetch all build records from the database
    const builds = await BuildModel.find();
    response.status(200).json(builds);
  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route handler for '/new' endpoint
app.post('/new', upload.single('image1'), async (request, response) => {
  try {
    const { name, price, location, category } = request.body;

    if (!request.file) {
      return response.status(400).json({ error: 'No file uploaded' });
    }

    // Create a new instance of BuildModel
    const newBuild = new BuildModel({
      name,
      price,
      location,
      category,
      image1: {
        data: request.file.buffer,
        contentType: request.file.mimetype
      }
    });

    // Save the data to MongoDB
    await newBuild.save();
    response.status(200).json({ message: 'Record saved' });
  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

const PlotModel = require('./model/Plotdetails');
const buildmodel = require("./model/Build");
//plot api

 
  app.post('/plot',(request,response)=>{
    console.log(request.body)
    new PlotModel(request.body).save();
    response.send("Record Successfully Saved")

})
app.get('/views',async(request,response)=>{
  var data=await PlotModel.find();
  response.send(data)
});
app.get('/view',async(request,response)=>{
  var data=await buildmodel.find();
  response.send(data)
});
app.put('/edits/:id',async(request,response)=>{
  let id=request.params.id
  await PlotModel.findByIdAndUpdate(id,request.body)
  response.send("Data uploaded")
})

// Start the server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

