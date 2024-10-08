const { redisClient } = require("@config/redis");
const { User } = require("./models/app/User");
const { asyncErrorHandler } = require("./utils/helpers/asyncErrorHandler");
const { v4: uuidv4 } = require('uuid');
const ExpressApp = require("express")();
/**
 * 
 * @param {ExpressApp} app 
 */
module.exports = (app) => {

    // POST route to receive data
    app.post('/receiver', asyncErrorHandler(async (req, res) => {
        const { user, class: userClass, age, email } = req.body;

        // Validation
        if (!user || !userClass || !age || !email) {
            return res.status(400).send('All fields are required');
        }

        // Insert into MongoDB (or Postgres)
        const record = new User({
            id: uuidv4(),
            user,
            class: userClass,
            age,
            email,
            inserted_at: new Date()
        });


        await record.save();

        // Publish event to Redis (message for listener service)
        redisClient.publish('record_created', JSON.stringify(record));

        res.status(201).send('Record saved and event published');
    }));
}