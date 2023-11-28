const express = require('express');
const app = express();

const categoryRoutes = require('./api servers/categorymanagement');
const imageRoutes = require('./api servers/imagemanagement');
const productRoutes = require('./api servers/productmanagement');
const profileRoutes = require('./api servers/profilemanagement');
const userRoutes = require('./api servers/usermanagement');

// Use API routes in the Express app
app.use(categoryRoutes);
app.use(imageRoutes);
app.use(productRoutes);
app.use(profileRoutes);
app.use(userRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});