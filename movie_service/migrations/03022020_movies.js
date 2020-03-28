module.exports = {
    async up(knex) {

        await knex.schema.createTable('movie', (table) => {

            table.increments('id');
            table.string('title').unique();
            table.date('realeaseDate');
            table.string('director');
            table.float("price");

        });
    },
    async down(knex) {

        await knex.schema.dropTableIfExists('movie');
    }
};
