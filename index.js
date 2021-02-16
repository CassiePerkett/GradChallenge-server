const { ApolloServer, gql } = require("apollo-server");
const coinData = require("./coinsclass.js");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  
  type Coin {
    id: String
    symbol: String
    name: String
    nameid: String
    rank: String
    price_usd: String
    percent_change_24h: String
    percent_change_1h: String
    percent_change_7d: String
    price_btc: String
    market_cap_usd: String
    volume24: String
    volume24a: String
    csupply: String
    tsupply: String
    msupply: String

  }

  type Query {
    getCoin(id: String): Coin
    getAllCoin(id:String): [Coin]
  }
`;



const resolvers = {
    Query: {
      getCoin: async (_, {id}, {dataSources}) =>
      dataSources.coinData.getCoin(id),
      getAllCoin: async (_, {id}, {dataSources}) =>
      dataSources.coinData.getAllCoin(id)
    },
  };

const server = new ApolloServer({ typeDefs, resolvers, dataSources: () => ({coinData: new coinData() }) });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});


