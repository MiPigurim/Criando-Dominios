const { ApolloServer } = require("apollo-server");

const typeDefs = `
  typeItem {
    id: Int
    type: String
    description: String
  }
  
  type Query {
    prefixes: [Item]
    sufixes: [Item]
  }

  const prefixes = [
    { id: 1, type: "prefix", description: "Air" },
    { id: 2, type: "prefix", description: "Jet" },
    { id: 3, type: "prefix", description: "Flight" },
  ];

  const sufixes = [
    { id: 4, type: "sufix", description: "Hub" },
    { id: 5, type: "sufix", description: "Station" },
    { id: 6, type: "sufix", description: "Mart" },
  ];

  const resolvers = {
    Query: {
      prefixes: () {
        return items.filter((item) => item.type === "prefix");
      },
      sifixes: () {
        return items.filter((item) => item.type === "sufix");
      }
  `;

const server = new ApolloServer({ typeDefs, resolvers });
server.listen();
