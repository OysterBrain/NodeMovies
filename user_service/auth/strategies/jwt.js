'use strict';

module.exports = (server, options) => {

    return {
        name    : 'jwt',
        scheme  : 'jwt',
        options : {
            key      : '123',
            validate : async (decoded, request) => {

                return {isValid : true};
             
            }
        }
    };
};
