'use strict';

const Schwifty = require('schwifty');
const Joi = require('@hapi/joi');

module.exports = class CartMovies extends Schwifty.Model {

    static get tableName() {

        return 'cart-movies';
    }

    static field(name) {
        return this.getJoiSchema().extract(name)
            .optional()
            .options({ noDefaults: true })
    }

    static get joiSchema() {

        return Joi.object({
            idCart: Joi.number().integer(),
            idMovie: Joi.number().integer(),
        }); // eslint-disable-line no-undef
    }

};
