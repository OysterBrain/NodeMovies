"use strict";
const Toys = require("toys");
const Joi = require("@hapi/joi");
const Movie = require("../models/movie");

const defaults = Toys.withRouteDefaults({
    options: {
        tags: ["api", "movie"],
        response: {
            schema: Joi.object({
                id: Movie.field("id"),
                title: Movie.field("title"),
                realeaseDate: Movie.field("realeaseDate"),
                director: Movie.field("director"),
            })
        }
    }
});



module.exports = defaults([

    {
        method: "post",
        path: "/movie",
        options: {
            validate: {
                payload: Joi.object({
                    title: Movie.field("title").required(),
                    realeaseDate: Movie.field("realeaseDate").required(),
                    director: Movie.field("director").required(),
                })
            },
            response: {
                emptyStatusCode: 204,
                schema: true
            }
        },
        handler: request => {
            const { movieService } = request.services();

            return movieService.create(request.payload);
        }
    },
    {
        method: "delete",
        path: "/movie/{id}",
        options: {
            validate: {
                params: Joi.object({
                    id: Movie.field("id")
                })
            },
            response: {
                emptyStatusCode: 204,
                schema: true
            }
        },
        handler: async request => {
        
            const { movieService } = request.services();
            await movieService.delete(request.params.id);
            return "";
        }
    },

    {
        method: "get",
        path: "/movies",
        options: {
            response: {
                emptyStatusCode: 204,
                schema: true
            },
            validate : {
                query : Joi.object({
                    title : Joi.string()
                })
            }
        },
        handler: request => {
           
            const { movieService } = request.services();
            
            return movieService.list(request.query.title);
        }
    },
    {
        method: "get",
        path: "/movie/{id}",
        options: {
            validate: {
                params: Joi.object({
                    id: Movie.field("id").required()
                })
            },
            response: {
                emptyStatusCode: 204,
                schema: true
            }
        },
        handler: async request => {
            const { movieService } = request.services();

            return movieService.findById(request.params.id);
        }
    },
    {
        method: "patch",
        path: "/movie/{id}",
        options: {
            validate: {
                params: Joi.object({
                    id: Movie.field("id")
                }),
                payload: Joi.object({
                    title: Movie.field("title").required(),
                    realeaseDate: Movie.field("realeaseDate").required(),
                    director: Movie.field("director").required(),
                })
            },
            response: {
                emptyStatusCode: 204,
                schema: true
            }
        },
        handler: async request => {
            const { movieService } = request.services();

            await movieService.update(request.params.id, request.payload);
            return "";
        }
    },
  
]);
