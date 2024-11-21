const express = require("express");
const app = express();

// import all the routes
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Coures");
const contactRoutes = require("./routes/Contact");

// other configs 
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const fileUpload = require("express-fileupload");

// database connect 
const dbConnect = require("./config/database");
dbConnect();

// cloudinary connect
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// middlewares
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true,
    })
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

// routes 
app.use("/api/v1/auth" , userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/reach" , contactRoutes)

// start the server
app.listen(PORT , () => {
    console.log(`app is running at this port ${PORT}`)
});

// define the basic route
app.get("/" , (req,res) => {
    res.send(`<h1>Hello baby , server is running..</h1>`)
});
