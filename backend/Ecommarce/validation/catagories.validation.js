const Joi = require('joi');

const createcategory =  {
    body: Joi.object().keys({
        name: Joi.string().required().max(30).uppercase().trim(),
        discription: Joi.string().required().max(100),
        image: Joi.string().allow('')
    })
}


module.exports = {
    createcategory
}

