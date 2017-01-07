const mongoose = require('mongoose');
const config = require('config-lite');

mongoose.connection.on("connecting", () => {
	console.log('Connecting to MongoDB...');
});
mongoose.connection.on("error", (error) => {
	console.log('Error in MongoDb connection: ' + error);
	mongoose.disconnect();
});
mongoose.connection.once('open', () => {
    console.log('MongoDB connection opened!');
});
mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected!');
});
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected!');
});

mongoose.connect(config.mongodb, {
    server: {
        auto_reconnect: true
    }
});

exports.mongoose = mongoose;