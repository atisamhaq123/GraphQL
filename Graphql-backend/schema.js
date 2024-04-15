export const typeDefs = `#graphql

    type Game {
        id:ID!
        title:String!
        platform: [String!]!
        reviews: [Review!]
    }

    type Review {
        id: ID!
        rating: Int!
        content: String!
        game: Game
        author: Author

    }
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }
 

    type Query {
        reviews: [Review]
        review(id: ID!): Review
        games: [Game]
        game(id: ID!): Game
        authors: [Author]
        author(id: ID!): Author
    }
    type Mutation {
        addGame(game:AddGameInput): Game # will return a Game Single object
        addAuthor(author:AddAuthorInput): [Author] # will return a Game Single object
        deleteGame (id: ID!): [Game] # will return a Game array
        deleteAuthor (id: ID!): [Author] # will return a Author array
        deleteReview (id: ID!): [Review] # will return a Review array
        updateGame(id:ID!, edits:UpdateGameInput):[Game]
        updateAuthor(id:ID!, edits:UpdateAuthorInput):[Author]
        updateReview(id:ID!, edits:UpdateReviewInput):[Review]
        
    }
    input AddGameInput {
        title:String!
        platform: [String!]!
    }
    input AddAuthorInput {
        name:String!
        verified: Boolean!
    }
    input UpdateGameInput {
        title:String
        platform: [String!]
    }
    input UpdateAuthorInput {
        name:String
        verified: Boolean
    }
    input UpdateReviewInput {
        rating:Int
        content: String
    }

`
