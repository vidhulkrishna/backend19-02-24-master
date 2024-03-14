const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://dephin16:thejuspuli@cluster0.fxbesy7.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{console.log("DB connected2")})
.catch(err=>console.log(err));


const plotSchema = new mongoose.Schema({
  pname: String,
  pprice: String,
  plocation: String,
  pcategory: String
});

const PlotModel = mongoose.model("plot", plotSchema);

module.exports = PlotModel;