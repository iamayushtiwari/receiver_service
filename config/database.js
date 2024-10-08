// getting-started.js
const mongoose = require('mongoose');
const connection = mongoose.connection
const { connection_string } = require('.');

const options = {
    maxPoolSize: 10,  // Adjust the pool size according to your needs
    serverSelectionTimeoutMS: 5000,  // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000,  // Close sockets after 45 seconds of inactivity
};
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(connection_string, options);
}

connection.on('error', console.error.bind(console, "Error unable to connect database...!"));

connection.once('open', function (error) {
    if (error) {
        console.log('unable to connect database...!', err)
    } else {
        console.log("Connected MongoDB Successfully...!",)
    }
})
module.exports = { connection };