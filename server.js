const express = require('express');
const app = express();

const categoryRoutes = require('./api servers/Admin/categorymanagement');
const imageRoutes = require('./api servers/Admin/imagemanagement');
const productRoutes = require('./api servers/Admin/productmanagement');
const profileRoutes = require('./api servers/Admin/profilemanagement');
const userRoutes = require('./api servers/Admin/usermanagement');


const CustomerProductTypeManagement = require('./api servers/Customer/categorymanagement');
// Use API routes in the Express app
app.use(categoryRoutes);
app.use(imageRoutes);
app.use(productRoutes);
app.use(profileRoutes);
app.use(userRoutes);
app.use(CustomerProductTypeManagement);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});