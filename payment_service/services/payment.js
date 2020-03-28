"use strict";

const Schmervice = require("schmervice");
const got = require('got');
const Boom = require('@hapi/boom');

const instance = got.extend({ resolveBodyOnly : true, responseType : 'json',
    hooks: {
        beforeRequest: [
            options => {
                if (!options.context && !options.ctx.token) {
                    throw new Error('Token required');
                }
 
                options.headers.authorization = options.ctx.token;
            }
        ]
    }
});

module.exports = class PaymentService extends Schmervice.Service {


  async findCartByIdCart(id, ctx = {}) {
    const { Cart } = this.server.models();

    try{    
        return Cart.query(ctx.trx).findById(id);
    }catch(error){
        throw Boom.badRequest();
    }
    
  }

  async create(cart, ctx = {}) {
    const { Cart } = this.server.models();
    return Cart.query(ctx.trx)
      .insert(cart)
  }

  async createCartMovies(cartMovie, ctx = {}) {

    try{
        const response = await instance('http://127.0.0.1:3000/movie/'+cartMovie.idMovie, {ctx});
        const cart = await findCartByIdCart(cartMovie.idCart,ctx);
        if(cart){
            const {CartMovies} = this.server.models();
            return CartMovies.query(ctx.trx).insert(cartMovie);
        }
        throw Boom.notFound()
    }catch(error){
        throw Boom.badRequest();
    }
  }

  async deleteCartMovies(cartMovie, ctx = {}) {
    try{
        const response = await instance('http://127.0.0.1:3000/movie/'+cart.idMovie, {ctx});
        const cart = await findCartByIdCart(cart.id,ctx);
        if(cart){
            const {CartMovies} = this.server.models();
            return CartMovies.query(ctx.trx).delete().where({idCart : cartMovie.idCart,idMovie : cartMovie.idMovie}).limit(1);
        }
        throw Boom.notFound()
    }catch(error){
        throw Boom.badRequest();
    }
  }
  
  async findCart(idCart,ctx = {}){

    const { Cart } = this.server.models();
    const { CartMovies } = this.server.models();
    const cart =  await Cart.query(ctx.trx).findById(idCart);

    if(cart){

        const cartMovies = await CartMovies.query(ctx.trx).select().where({ idCart : idCart });
        const movies = await Promise.all(cartMovies.map(cartMovie=>instance("http://127.0.0.1:3000/movie/"+cartMovie.idMovies,{ctx})));
        let price = 0;

        for(let i = 0 ;i<movies.length;i++){
            price += movies[i].price;
        }

        return {
            idCart : idCart,
            price : price*(price*0.2),
            movies : movies
        }

    }
    throw Boom.badRequest();
  }

  async deleteAllCartMovies(idMovie, ctx = {}) {

        try {

            const {CartMovies} = this.server.models();
            return CartMovies.query(ctx.trx).delete().where({idMovie : idMovie}).debug();

        } catch (error) {
            console.log(error);
            throw Boom.badRequest();
        }
    }
  async paymentCart(idCart,cardNumber , ctx ={}){
      const { Cart } = this.server.models();

      const cart = await Cart.query(ctx.trx).findById(idCart);

      if(cart){
          return "Le paiement de votre panier a été effectué avec succés";
      }
      throw Boom.notFound();

  }

};
