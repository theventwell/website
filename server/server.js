require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./utilities/dbConnection');
const userRouter = require('./routes/users.route');
const adminRouter = require('./routes/admin.router');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors(
  {
    origin: '*',
    credentials: true,
  }
));
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

app.use('/api/users', userRouter);
app.use('/api/admin', adminRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});