import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID!
    userName: String!
    firstName: String!
    lastName: String
  }
  type Tweet {
    id: ID!
    text: String!
    author: User!
  }

  type Query {
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
  }

  type Mutaion {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;

const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }) => console.log(`Running on "${url}" ✅`));