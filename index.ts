import Express from 'express';
import controllers from './src/Controllers/Index';
import { getEnvironment } from './src/Configs/Environment';
import { ApolloServer } from 'apollo-server-express';

const cors = require('cors');
const typeDefs = require('./src/Utils/Schema/Index');
const resolvers = require('./src/Utils/Resolvers/Index');

getEnvironment();

const app = Express();
let port = process.env.PORT || 3033;

app.use(cors());
app.use('/core-rest', Express.json());
app.use(Express.urlencoded({ extended: true }));
app.listen(port, () => {
    console.log('Api escuchando en puerto', port)
});

app.use('/core-rest', controllers);

const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(() => {
    return server.applyMiddleware({ app })
})

export default app;