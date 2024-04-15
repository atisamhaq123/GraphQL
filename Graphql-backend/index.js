import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import db from './db.js';

const resolvers = {
  Query: {
    games() {
      return db.games
    },
    game(_, args) {
      return db.games.find((game) => (game.id == args.id))
    },
    reviews() {
      return db.reviews
    },
    review(_, args) {
      return db.reviews.find((review) => (review.id === args.id))
    },
    authors() {
      return db.authors
    },
    author(_, args) {
      return db.authors.find((author) => author.id === args.id)
    }
  },
  Game: { //parent represent data from game array
    reviews(parent) {
      return db.reviews.filter((r) => r.game_id == parent.id)
    },
  },
  Author: { //parent represent data from author array
    reviews(parent) {
      return db.reviews.filter((r) => r.author_id == parent.id)
    }
  },
  Review: {  //parent represent data from reivews array
    game(parent) {
      return db.games.find((r) => r.id == parent.game_id)
    },
    author(parent) {
      return db.authors.find((r) => r.id == parent.author_id)
    }
  },
  Mutation: {
    deleteGame(_, args) {
      db.games = db.games.filter((game) => game.id !== args.id);
      db.games = db.games.map((game) => {
        let associatedReviews = db.reviews.filter((review) => review.game_id === game.id);
        return {
          ...game,
          reviews: associatedReviews // Ensure reviews is always an array
        };
      });

      return db.games;
    },
    deleteReview(_, args) {
      //let obj = db.reviews.find((g)=>g.id===args.id) //to be retured
      db.reviews = db.reviews.filter((r) => r.id !== args.id)
      return db.reviews;
    },
    deleteAuthor(_, args) {
      //let obj = db.authors.find((g)=>g.id===args.id) //to be retured
      db.authors = db.authors.filter((r) => r.id !== args.id)
      return db.authors
    },
    addGame(_, args) {
      let game = {
        ...args.game,
        // id: Math.floor((Math.random) *100).toString()
        id: String(parseInt(db.games[db.games.length - 1].id)+1)
      }
      db.games.push(game)
      return game
    },
    addAuthor(_, args) {
      let author = {
        ...args.author,
        // id: Math.floor((Math.random) *100).toString()
        id: String(parseInt(db.authors[db.authors.length - 1].id)+1)

      }
      db.authors.push(author)
      return db.authors
    },
    updateGame(_, args) {
      db.games = db.games.map((g) => {
        if (g.id === args.id) {
          return { ...g, ...args.edits }
          //This line creates a new object by copying all properties from g and args.edits into it. If there are properties with the same name in both objects, the one from args.edits will overwrite the one from g.
          //if both contains different keys, new object will unite all keys from both object. Called Merge with no conflict
        }
        return g
      })
      db.games = db.games.map((game) => {
        let associatedReviews = db.reviews.filter((review) => review.game_id === game.id);
        return {
          ...game,
          reviews: associatedReviews // Ensure reviews is always an array
        };
      });

      // return db.games.find((g) => g.id === args.id)
      return db.games
    },
    updateAuthor(_, args) {
      db.authors = db.authors.map((g) => {
        if (g.id === args.id) {
          return { ...g, ...args.edits }
          //This line creates a new object by copying all properties from g and args.edits into it. If there are properties with the same name in both objects, the one from args.edits will overwrite the one from g.
          //if both contains different keys, new object will unite all keys from both object. Called Merge with no conflict
        }
        return g
      })

      // return db.authors.find((g) => g.id === args.id)
      return db.authors
    },
    updateReview(_, args) {
      db.reviews = db.reviews.map((g) => {
        if (g.id === args.id) {
          return { ...g, ...args.edits }
          //This line creates a new object by copying all properties from g and args.edits into it. If there are properties with the same name in both objects, the one from args.edits will overwrite the one from g.
          //if both contains different keys, new object will unite all keys from both object. Called Merge with no conflict
        }
        return g
      })

      // return db.reviews.find((g) => g.id === args.id)
      return db.reviews
    },

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
