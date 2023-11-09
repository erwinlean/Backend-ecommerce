var mongoose = require('mongoose'); 
require('dotenv').config();
const dbCluster = process.env.DB_CLUSTER;

mongoose.set('strictQuery', false);

mongoose.connect(dbCluster, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected: MongoDB Atlas');
}).catch((err) => {
  console.error('Failed to connect to MongoDB Atlas:', err);
});