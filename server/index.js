const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
app.use(cors());
const mongoose = require( "mongoose" );
const Test = require("./src/models/data");
// const bodyParser = require("body-parser");
app.use(express.json({ extended: false }));

const connectDB = async () => {
    try {
        await mongoose.connect( process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } );
        console.log( "MongoDB Connected..." );
    }catch( err ) {
        console.log( err.message );
        process.exit( 1 );
    }
}

connectDB();


// app.get("/", (req, res) => {
//     res.send(process.env.PORT);
// })

app.get("/",async (req, res) => {
     await Test.find().exec((error, data) => {
        if (error) return res.status(500).send(error);
        if (data) return res.status(200).send(data);
    });  
})

app.use("/",require("./src/router/getData"))
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));