import { ApolloServer, gql } from "apollo-server";
import fetch from "node-fetch";

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
  type Movie {
    id: Int!
    url: String!
    imdb_code: String!
    title: String!
    title_english: String!
    title_long: String!
    slug: String!
    year: Int!
    rating: Float!
    runtime: Float!
    genres: [String]!
    summary: String
    description_full: String!
    synopsis: String
    yt_trailer_code: String!
    language: String!
    background_image: String!
    background_image_original: String!
    small_cover_image: String!
    medium_cover_image: String!
    large_cover_image: String!
  }

  type Query {
    allUsers: [User!]!
    allTweets: [Tweet!]!
    """
    트윗
    """
    tweet(id: ID!): Tweet
    allMovies: [Movie!]!
    movie(id: String!): Movie
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
    allMovies: () =>
      fetch("https://yts.mx/api/v2/list_movies.json")
        .then((res) => res.json())
        .then((json) => json.data.movies),
    movie: (__, { id }) =>
      fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        .then((res) => res.json)
        .then((json) => json.data.movie),
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
