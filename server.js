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

const admin = require('./firebase');
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const employeeRoutes = require('./routes/employee');
const companyRoutes = require('./routes/company');
const http = require("http");         
const socketIO = require('socket.io');
const app = express();

// connect mongo
connectDB();

// middleware to read json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(cors({
  origin: '*',   // allow all origins (for development)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ THIS LINE CONNECTS /employees
app.use('/employees', employeeRoutes);

app.use('/companies', companyRoutes);

// test route
app.get('/', (req, res) => {
  res.send('Server is running');
});


const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// io.on('connection', socket => {
//   console.log('✅ Client connected:', socket.id);

//   // RECEIVE from Ionic
//   socket.on('sendMessage', data => {
//     console.log('📩 Message received:', data);
//   const { senderId, receiverId, message } = data;
//     // SEND to all clients
//     io.emit('receiveMessage', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('❌ Client disconnected:', socket.id);
//   });
// });


io.on('connection', socket => {
  console.log('✅ Client connected:', socket.id);

  socket.on('sendMessage', async (data) => {
    console.log('📩 Message received:', data);
const fcm = 'cYGIJzWoRC2g-2HqYBCSH9:APA91bGHIu5dszkiMP5fyN_RvNhUy91Z1KORariH20o9TrF-Atx-dhaF9ITTpNS_EtblmH8FQWiwu7zxdjSSNQ0MSEnT81Bw9mWzC3q82ZF0AhKiQPmWsfQ'
    const { senderId, receiverId,message } = data;

    // 1️⃣ Emit socket message (live users)
    io.emit('receiveMessage', data);

    // 2️⃣ Get receiver FCM token
    // const receiver = await Employee.findById(receiverId);

    // if (!receiver || !receiver.fcmToken) {
    //   console.log('⚠️ No FCM token found');
    //   return;
    // }

    // 3️⃣ Send Firebase push notification
    const payload = {
      notification: {
        title: 'New Message',
        body: message
      },
      token: fcm
    };

    try {
      await admin.messaging().send(payload);
      console.log('🔥 Firebase notification sent');
    } catch (err) {
      console.error('❌ Firebase error:', err.message);
    }
  });

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
// const PORT = process.env.PORT || 3000;
server.listen(PORT,'0.0.0.0', () => {
  console.log('Server started on port 3000');
});
