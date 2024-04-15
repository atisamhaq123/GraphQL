import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import db from './db.js';

const resolvers = {
    Query: {
      games() {
        return db.games
      },
      game(_,args) {
        return db.games.find((game)=>(game.id==args.id))
      },
      reviews() {
        return db.reviews
      },
      review(_, args){ //first argument is parent we don't need that right now
        return db.reviews.find((review)=> (review.id===args.id))
      },
      authors() {
        return db.authors
      },
      author(_, args) {
        return db.authors.find((author)=>author.id===args.id)
      }
    },
    //used for nested relations in tables (related Data//association)
    //we can find review associated with specific game and author associated with specific game
    //If we need to find game associated with specific review then nested 
    // review(id: $reviewId) {
    //   rating
    //   game {
    //     platform
    //     title
    //   }
    // }

    // review(_, args){
    //   return db.reviews.find((review)=> (review.id===args.id))
    // },

    // Review:{  //parent represent data from reivews array
    //   game(parent){
    //     return db.games.find((r)=>r.id==parent.game_id)
    //   },
    // }
    
    //
    Game: { //parent represent data from game array
      reviews (parent){   //first element is parent which we previously taken as _
        return db.reviews.filter((r)=>r.game_id==parent.id)
      },
    },
    Author:{ //parent represent data from author array
      reviews(parent){
        return db.reviews.filter((r)=>r.author_id==parent.id)
      }
    },
    Review:{  //parent represent data from reivews array
      game(parent){
        return db.games.find((r)=>r.id==parent.game_id)
      },
      author(parent){
        return db.authors.find((r)=>r.id==parent.author_id)
      }
    }
  };
const server = new ApolloServer({
    typeDefs,
    resolvers
  });
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
console.log(`🚀  Server ready at: ${url}`);
