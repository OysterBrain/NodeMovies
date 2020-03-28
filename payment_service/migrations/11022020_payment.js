module.exports = {
    async up(knex) {

        await knex.schema.createTable('cart', (table) => {

            table.increments('id').unique();
            table.integer('idUser');
            table.boolean('isPaid');

        });

        await knex.schema.createTable('cart-movies', (table) => {

            table.integer('idCart');
            table.integer('idMovies');

        });
    },
    async down(knex) {

        await knex.schema.dropTableIfExists('movie');
    }
};
