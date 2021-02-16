const fetch = require("node-fetch");
const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  
  type Coin {
    id: ID!
    symbol: String!
    name: String!
    nameid: String!
    rank: Float!
    price_usd: String!
    percent_change_24h: String!
    percent_change_1h: String!
    percent_change_7d: String!
    price_btc: String!
    market_cap_usd: String!
    volume24: Float!
    volume24a: Float!
    csupply: String!
    tsupply: String!
    msupply: String!

  }

  type Query {
    getCoins: [Coin]
  }
`;

let coin; 

const resolvers = {
    Query: {
      getCoins: () => coin,
    },
  };

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});