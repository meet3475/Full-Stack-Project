const Joi = require("joi");
const { pick } = require("../../helper/pick");

const Validation = (schema) => (req, res, next) => {

    try {
        // console.log(req);
        // console.log(Object.keys(schema));

        const objs = pick(req, Object.keys(schema))
        console.log(objs);

        const { error, value } = Joi.compile(schema)
            .prefs({
                abortEarly: false
            })
            .validate(object);

        console.log(error, value);

        if (error) {
            const errMsg = error.details.map((v) => v.message).join(", ")

            return object.assign(errMsg)

        }
        next();
        
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    Validation
}