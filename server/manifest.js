'use strict';

const Dotenv = require('dotenv');
const Confidence = require('confidence');
const Toys = require('toys');

// Pull .env into process.env
Dotenv.config({ path: `${__dirname}/.env` });

// Glue manifest as a confidence store
module.exports = new Confidence.Store({
    server: {
        host: 'localhost',
        port: {
            $env: 'PORT',
            $coerce: 'number',
            $default: 3000
        },
        debug: {
            $filter: { $env: 'NODE_ENV' },
            $default: {
                log: ['error'],
                request: ['error']
            },
            production: {
                request: ['implementation']
            }
        }
    },
    register: {
        plugins: [

            {
                plugin: 'hapi-auth-jwt2'
            },
            {
                plugin: '../user_service', // User plugin
                options: {}
            },
            {
                plugin: '../movie_service', // Movie plugin
                options: {}
            },
            {
                plugin: '../payment_service', // Payment plugin
                options: {}
            },
            {

                plugin: './plugins/swagger'
            },
            {
                plugin: 'schwifty',
                options: {
                    $filter: 'NODE_ENV',
                    $default: {},
                    $base: {
                        migrateOnStart: true,
                        knex: {
                            client: 'mysql',
                            connection: {
                                host: process.env.DB_HOST || '127.0.0.1',
                                user: process.env.DB_USER || 'root',
                                password: process.env.DB_PASSWORD || '',
                                database: process.env.DB_DATABASE || 'node_movie'
                            }
                        }
                    },
                    production: {
                        migrateOnStart: false
                    }

                }

            },
            {
                plugin: {
                    $filter: { $env: 'NODE_ENV' },
                    $default: 'hpal-debug',
                    production: Toys.noop
                }
            },



        ]
    }
});
