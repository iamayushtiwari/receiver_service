const { body } = require("express-validator");
const { validateErrors } = require("./utils/helpers/express_validator");
const { createStudent } = require("./services/User/Controller");
const ExpressApp = require("express")();
/**
 * 
 * @param {ExpressApp} app 
 */
module.exports = (app) => {

    // POST route to receive data
    app.post('/receiver', [
        body('user', "user fields are required").notEmpty(),
        body('userClass', "userClass fields are required").notEmpty(),
        body('age', "age fields are required").notEmpty(),
        body('email', "email fields are required").notEmpty()
    ], validateErrors,createStudent);
}