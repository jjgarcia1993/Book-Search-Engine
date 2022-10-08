const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//new
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });
  await server.start()
  server.applyMiddleware({ app })
}

startApolloServer();



// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`Now listening on localhost:${PORT}`));
});