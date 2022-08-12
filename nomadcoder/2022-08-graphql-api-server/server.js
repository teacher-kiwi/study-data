import { ApolloServer, gql } from "apollo-server";

let tweets = [
  {
    id: "1",
    text: "one",
    userId: "2",
  },
  {
    id: "2",
    text: "two",
    userId: "1",
  },
];

let users = [
  {
    id: "1",
    firstName: "nico",
    lastName: "las",
  },
  {
    id: "2",
    firstName: "elon",
    lastName: "mask",
  },
];

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    fullName: String!
  }
  type Tweet {
    id: ID!
    text: String!
    author: User
  }

  type Query {
    allUsers: [User!]!
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
  }

  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    allUsers: () => users,
    allTweets: () => tweets,
    tweet: (__, { id }) => tweets.find((tweet) => tweet.id === id),
  },
  Mutation: {
    postTweet: (__, { text, userId }) => {
      const newTweet = {
        id: `${parseInt(tweets[tweets.length - 1].id) + 1}`,
        text,
        userId,
      };
      tweets.push(newTweet);
      return newTweet;
    },
    deleteTweet: (__, { id }) => {
      const tweet = tweets.find((tweet) => tweet.id === id);
      if (!tweet) return false;
      tweets = tweets.filter((tweet) => tweet.id !== id);
      return true;
    },
  },
  User: {
    fullName: ({ firstName, lastName }) => `${firstName} ${lastName}`,
  },
  Tweet: {
    author: ({ userId }) => users.find((user) => user.id === userId),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`Running on "${url}" ✅`));
