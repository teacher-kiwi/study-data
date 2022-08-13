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
    """
    Is the sum of firstName + LastName as a string
    """
    fullName: String!
  }
  """
  Tweet object represents a resource for a Tweet
  """
  type Tweet {
    id: ID!
    text: String!
    author: User
  }

  type Query {
    allUsers: [User!]!
    allTweets: [Tweet!]!
    """
    트윗
    """
    tweet(id: ID!): Tweet
  }

  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    """
    Deletes a Tweet if found, else returns false
    """
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
      if (!users.find((user) => user.id === userId)) {
        try {
          throw new Error("userId is not found");
        } catch (e) {
          console.log(e);
          throw e;
        }
      }
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
