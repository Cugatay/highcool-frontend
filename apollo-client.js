import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_PRODUCTION ? 'https://prisold.com/api/graphql' : 'http://localhost:5000/graphql'}`,
  // uri: 'http://192.168.1.25:5000/graphql',
  cache: new InMemoryCache(),
});

export default client;
