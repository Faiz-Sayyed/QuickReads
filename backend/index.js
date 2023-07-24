const express = require('express');
const App = express();

const articles = require('./routes/articles.js');
const summary = require('./routes/summary.js');
const auth = require('./routes/auth.js');
const requireAuth = require('./middlewares/requireAuth.js')

const connectDB = require('./db/connect.js');

require('dotenv').config();
const cors = require("cors");

const PORT = process.env.port || 5000;
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
App.use(cors(corsOptions));

App.use(express.json());

App.get("/", (req, res) => {
    res.send({ message: "Hello World!" });
});

App.use('/api/v1/auth', auth);
App.use('/api/v1/articles', requireAuth, articles);
App.use('/api/v1/summary', requireAuth, summary);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        App.listen(PORT, console.log(`Server is listening on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start();