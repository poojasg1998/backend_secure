// const express = require('express');
// const connectDB = require('./config/db');

// const app = express();

// // Connect Database
// connectDB();

// // Middleware
// app.use(express.json());

// // Test route
// app.get('/', (req, res) => {
//   res.send('Server is running');
// });

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });
require('dotenv').config();

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const connectDB = require('./config/db');
const admin = require('./firebase');

const employeeRoutes = require('./routes/employee');
const companyRoutes = require('./routes/company');
const fcmtokenRoutes = require('./routes/fcmtoken');
const Fcmtoken = require('./models/fcm_tokens');
const app = express();

// 🔹 Connect MongoDB
connectDB();

// 🔹 Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 Routes
app.use('/users', employeeRoutes);
app.use('/companies', companyRoutes);
app.use('/FCM_Tokens', fcmtokenRoutes);

// 🔹 Test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// 🔹 Create server
const server = http.createServer(app);

// 🔹 Socket.IO
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', socket => {
  console.log('✅ Client connected:', socket.id);

socket.on('sendMessage', async (data) => {
  try {
    const { message } = data;

    // Emit message to all clients
    io.emit('receiveMessage', data);

    // Get latest FCM token
    const lastTokenDoc = await Fcmtoken
      .findOne({}, { token: 1 })
      .sort({ _id: -1 });

    if (!lastTokenDoc) {
      console.log('⚠️ No FCM token found');
      return;
    }

    const registrationToken = lastTokenDoc.token;

    const payload = {
      data: {
        title: 'New Message',
        body: message
      },
      token: registrationToken
    };

    await admin.messaging().send(payload);
    console.log('🔥 Firebase notification sent');

  } catch (err) {
    console.error('❌ Firebase error:', err.code, err.message);

   if (error.code === 'messaging/registration-token-not-registered') {
  await Fcmtoken.deleteOne({ token });
}
  }
});

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

// 🔹 Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
