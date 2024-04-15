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
      review(_, args){
        return db.reviews.find((review)=> (review.id===args.id))
      },
      authors() {
        return db.authors
      },
      author(_, args) {
        return db.authors.find((author)=>author.id===args.id)
      }
    },
    Game: { //parent represent data from game array
      reviews (parent){
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
    },
    Mutation:{
      deleteGame(_,args){
        db.games= db.games.filter((r)=>r.id!==args.id)
        return db.games
      },
      addGame(_,args){
        let game = {
          ...args.game,
          // id: Math.floor((Math.random) *100).toString()
          id: Math.floor(Math.random() * 100).toString()
        }
        db.games.push(game)
        return game
      },
      updateGame(_,args){
        db.games = db.games.map((g) =>{
          if (g.id===args.id){
            return {...g, ...args.edits}
            //This line creates a new object by copying all properties from g and args.edits into it. If there are properties with the same name in both objects, the one from args.edits will overwrite the one from g.
            //if both contains different keys, new object will unite all keys from both object. Called Merge with no conflict
          }
          return g
        })

        return db.games.find((g)=>g.id===args.id)
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
