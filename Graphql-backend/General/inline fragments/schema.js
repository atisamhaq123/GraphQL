export const typeDefs = `#graphql
type Query {
    characters: [Character!]!
}

interface Character {
  name: String!
}

type Human implements Character {
  name: String!
  age: Int!
}

type Droid implements Character {
  name: String!
  primaryFunction: String!
}


`
