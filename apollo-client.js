import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: `http://${process.env.NEXT_PUBLIC_PRODUCTION ? 'backend' : 'localhost'}:5000/graphql`,
  // uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

export default client;
