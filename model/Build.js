const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://dephin16:thejuspuli@cluster0.fxbesy7.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{console.log("DB connected1")})
.catch(err=>console.log(err));

const buildschema1=new mongoose.Schema(
    {
        name:String,
        price:String,
        location:String,
        category:String,
        image1:{
            data:Buffer,
            contentType:String,
        }
    }
);
var buildmodel=mongoose.model("build",buildschema1)
module.exports=buildmodel;