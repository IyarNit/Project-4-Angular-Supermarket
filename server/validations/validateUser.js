const Joi = require("@hapi/joi");

const usersSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', `co.il`, `gov`] } }).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]')).min(3).max(20).required(),
    passwordVerification: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]')).min(3).max(20).required()
})


function usersValidation(req, res, next) {
    const { error } = usersSchema.validate(req.body);
    if (error) {
        // console.log(error.message)
        return res.json({ message: "email/userName/password must be a valid" })
    }
    next();
}


module.exports = usersValidation;
