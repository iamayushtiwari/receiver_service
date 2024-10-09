const { redisClient } = require("@config/redis");
const { v4: uuidv4 } = require('uuid');
const { asyncErrorHandler } = require("@src/v1/utils/helpers/asyncErrorHandler");
const { User } = require("@src/v1/models/app/User");

module.exports.createStudent = asyncErrorHandler(async (req, res) => {
    const { user, userClass, age, email } = req.body;

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
})