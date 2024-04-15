# GraphQL CRUD Operations with Angular and Node.js

## Overview
This repository contains a project focused on learning GraphQL CRUD (Create, Read, Update, Delete) operations. It implements a simple CRUD system for managing data related to games, reviews, and authors. The project includes both frontend and backend components, with the frontend built using Angular and the backend using Node.js. The GraphQL schema defines three main types: Game, Review, and Author. Each game can have multiple associated reviews, each written by an author.

## Features
- **Queries**: The system supports GraphQL queries for fetching games, reviews, and authors. The available queries include:
  - **reviews**: Fetches a list of all reviews available in the database.
  - **review(id: ID!)**: Fetches a single review identified by its unique ID.
  - **games**: Fetches a list of all games available in the database.
  - **game(id: ID!)**: Fetches a single game identified by its unique ID.
  - **authors**: Fetches a list of all authors available in the database.
  - **author(id: ID!)**: Fetches a single author identified by its unique ID.

- **Mutations**: CRUD operations are performed through mutations. The supported mutations include:
  - **addGame(game: AddGameInput)**: Adds a new game to the database and returns the newly created game object.
  - **addAuthor(author: AddAuthorInput)**: Adds a new author to the database and returns the updated list of authors.
  - **deleteGame(id: ID!)**: Deletes a game from the database and returns the updated list of games.
  - **deleteAuthor(id: ID!)**: Deletes an author from the database and returns the updated list of authors.
  - **deleteReview(id: ID!)**: Deletes a review from the database and returns the updated list of reviews.
  - **updateGame(id: ID!, edits: UpdateGameInput)**: Updates the details of a game in the database and returns the updated list of games.
  - **updateAuthor(id: ID!, edits: UpdateAuthorInput)**: Updates the details of an author in the database and returns the updated list of authors.
  - **updateReview(id: ID!, edits: UpdateReviewInput)**: Updates the details of a review in the database and returns the updated list of reviews.

## Learning Focus
This project is designed to be beginner-friendly, providing hands-on experience with GraphQL CRUD operations. By working with both frontend and backend components, developers can gain practical knowledge of building GraphQL APIs, defining schemas, performing queries, and executing mutations.

## Getting Started
To get started with this project, clone the repository and follow the setup instructions provided in the README file. Make sure to have Node.js and Angular CLI installed on your system. Once set up, you can start experimenting with GraphQL queries and mutations to interact with the database and see how the frontend and backend components communicate.

## Conclusion
By working through this project, developers can gain valuable experience in GraphQL CRUD operations while building a real-world application. This hands-on approach fosters a deeper understanding of GraphQL concepts and best practices, making it an ideal learning resource for beginners in web development.
