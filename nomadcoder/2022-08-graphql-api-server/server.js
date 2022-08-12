import { ApolloServer, gql } from "apollo-server";

let tweets = [
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

  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    allTweets: () => tweets,
    tweet: (__, { id }) => tweets.find((tweet) => tweet.id === id),
  },
  Mutation: {
    postTweet: (__, { text, userId }) => {
      const newTweet = {
        id: `${parseInt(tweets[tweets.length - 1].id) + 1}`,
        text,
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
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`Running on "${url}" ✅`));
