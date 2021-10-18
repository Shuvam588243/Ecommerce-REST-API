const joi = require('joi');

module.exports.createCategoryValidation = (category) => {
    const Schema = new joi.object({
        name : joi.string().required(),
        parentId : joi.string()
    })

    return Schema.validateAsync(category);
}