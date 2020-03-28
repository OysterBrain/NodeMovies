"use strict";
const Toys = require("toys");
const Joi = require("@hapi/joi");
const Cart = require("../models/cart");
const CartMovies = require("../models/cart_movies");


const defaults = Toys.withRouteDefaults({
    options: {
        tags: ["api", "Cart"],
        // response: {
        //     schema: Joi.object({
        //         id: Movie.field("id"),
        //         title: Movie.field("title"),
        //         realeaseDate: Movie.field("realeaseDate"),
        //         director: Movie.field("director"),
        //     })
        // }
    }
});



module.exports = defaults([

    {
        method: "post",
        path: "/cart",
        options: {
            validate: {
                payload: Joi.object({
                    idUser: Cart.field("idUser").required()
                })
            },
            response: {
                emptyStatusCode: 204,
                schema: true
            }
        },
        handler: request => {
            const { paymentService } = request.services();
            return paymentService.create(request.payload);
        }
    },
    {
        method: "get",
        path: "/cart/{id}",
        options: {
            validate: {
                params: Joi.object({
                    id: Cart.field("id").required()
                })
            },
            response: {
                emptyStatusCode: 204,
                schema: true
            }
        },
        handler: async request => {
            const { paymentService } = request.services();
            return paymentService.findCart(request.params.id, request.auth);
        }
    },
    {
        method: "post",
        path: "/cart/payement",
        options:{
            validate:{
                payload: Joi.object({
                    idCart: Cart.field('id').required(),
                    cardNumber: Joi.string().required().min(16).max(16),
                    crypto: Joi.string().required().min(3).max(3),
                    name: Joi.string().required(),
                    lastname: Joi.string().required(),
                })
            },
            response : {
                emptyStatusCode : 204,
                schema : true
            }
        },
        handler : async (request) => {

            const { payementService } = request.services();

            return payementService.payCart(request.payload.idCart, request.payload.cardNumber, request.auth);
        }
    },
    {
        method: "post",
        path: "/cart-movies",
        options: {
            validate: {
                payload: Joi.object({
                    idCart: CartMovies.field("idCart").required(),
                    idMovie: CartMovies.field("idMovie").required(),

                })
            },
            response: {
                emptyStatusCode: 204,
                schema: true
            }
        },
        handler: request => {
            const { paymentService } = request.services();
            
            return paymentService.createCartMovies(request.payload);
        }
    },
    {
        method: "delete",
        path: "/cart-movies",
        options: {
            validate: {
                payload: Joi.object({
                    idCart: CartMovies.field("idCart").required(),
                    idMovie: CartMovies.field("idMovie").required(),

                })
            },
            response: {
                emptyStatusCode: 204,
                schema: true
            }
        },
        handler: request => {
            const { paymentService } = request.services();
            return paymentService.deleteCartMovies(request.payload,request.auth);
        }
    },
    {
        method  : 'delete',
        path    : '/cart/deleteAllCartMovies/{id}',
        options : {
            validate : {
                params : Joi.object({
                    id : CartMovies.field('idMovie'),
                })
            },
            response : {
                emptyStatusCode : 204,
                schema : true
            }
        },
        handler : async (request) => {

            console.log(request.params);

            const { payementService } = request.services();

            return payementService.deleteAllCartMovies(request.params.id, request.auth);

        }
    }

  
]);
