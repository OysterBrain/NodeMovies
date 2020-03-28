"use strict";

const Schmervice = require("schmervice");



module.exports = class MovieService extends Schmervice.Service {
  list(title,ctx = {}) {

    const { Movie } = this.server.models();
    if(title){
      const movie = Movie.query(ctx.trx)
      .select()
      .where({ title });
      return movie;
    }else{

      return Movie.query(ctx.trx);
    }
  }

  findById(id, ctx = {}) {
    const { Movie } = this.server.models();
    return Movie.query(ctx.trx).findById(id);
  }

  create(movie, ctx = {}) {
    const { Movie } = this.server.models();

    return Movie.query(ctx.trx)
      .insert(movie)
  }

  update(id, movie, ctx = {}) {
    const { Movie } = this.server.models();
    return Movie.query(ctx.trx)
      .findById(id)
      .patch(movie);
  }

  async delete(id, ctx = {}) {
    const { Movie } = this.server.models();

    try {
        const response = await instance.delete('http://127.0.0.1:3000/cart/deleteAllCartMovies/'+id, {ctx});
        return Movie.query(ctx.trx).delete().where({ id : id });
    } catch (error) {
        console.log(error);
        throw Boom.badRequest();
    }
  }

 
};
