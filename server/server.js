require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./utilities/dbConnection');
const userRouter = require('./routes/users.route');
const adminRouter = require('./routes/admin.router');
const metaRouter = require('./routes/webhooks/meta.routes');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(
  cors({
    origin: clientOrigin,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

app.use('/api/users', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/webhooks/meta/whatsapp', metaRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});