import { ApolloServer, gql } from "apollo-server";

const tweets = [
  {
    id: "1",
    text: "one",
  },
  {
    id: "2",
    text: "two",
  },
];

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
    author: User
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

const resolvers = {
  Query: {
    allTweets: () => tweets,
    tweet: (__, { id }) => tweets.find((tweet) => tweet.id === id),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`Running on "${url}" ✅`));
