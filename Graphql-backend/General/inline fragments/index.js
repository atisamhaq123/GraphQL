import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import db from './db.js';

const resolvers = {
  
    Query: {
      characters() {
        return db.characters
      },
    },
    Character: {
      __resolveType(obj) {
        if (obj.age !== undefined) {
          return 'Human';
        }
        if (obj.primaryFunction !== undefined) {
          return 'Droid';
        }
        return null; // Return null if the object doesn't match any concrete type
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
