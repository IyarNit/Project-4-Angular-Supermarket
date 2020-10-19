const Joi = require("@hapi/joi");

const InfoSchema = Joi.object({
    name: Joi.string().pattern(new RegExp('^[a-zA-Z]')).min(3).max(20).required(),
    lastName: Joi.string().pattern(new RegExp('^[a-zA-Z]')).min(3).max(20).required(),
    city: Joi.string().pattern(new RegExp('^[a-zA-Z]')).min(3).max(20).required(),
    street: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]')).min(5).max(70).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', `co.il`, `gov`] } }).required(),
    id: Joi.string().pattern(new RegExp('^[0-9]')).min(9).max(9).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]')).min(3).max(20).required(),


})


function infoValidation(req, res, next) {
    const { error } = InfoSchema.validate(req.body);
    if (error) {
        // console.log(error)
        return res.json({ message: "invalid Info" })
    }
    next();
}


module.exports = infoValidation;
