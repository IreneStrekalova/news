require('dotenv').config();
const mongoose = require('mongoose');
const dbUrl = process.env.DOCKER_DB_URL;

mongoose.connect(dbUrl, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.info(`Connected to MongoDB - ${dbUrl}`);
});
mongoose.connection.on('error', () => {
    console.error('Connection ERROR');
});

module.exports = mongoose;