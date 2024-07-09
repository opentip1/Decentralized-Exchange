require("dotenv").config()


const express = require('express');
const path = require('path');
const mongoose = require("mongoose");

const cookiePaser = require("cookie-parser");

const {
    checkForAuthenticationCookie,
  } = require("./middlewares/authentication");

const userRoute = require("./routes/user");



const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URL)
  .then((e) => console.log("MongoDB Connected"));

// Set view engine to EJSs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false })); 
app.use(cookiePaser());
app.use(checkForAuthenticationCookie("token"));
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to render the EJS template
app.get('/', (req, res) => {
  res.render('home',{
    user: req.user
  });
});

app.use("/user", userRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


 