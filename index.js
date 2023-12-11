const express = require("express");
const dotenv = require("dotenv").config();
const contactRoutes = require("./routes/routes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");

connectDB();
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json()); //use Case ?
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
