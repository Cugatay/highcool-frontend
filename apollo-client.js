import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  // uri: `http://${process.env.NEXT_PUBLIC_PRODUCTION ? 'backend' : 'localhost'}:5000/graphql`,
  // uri: `${process.env.NEXT_PUBLIC_PRODUCTION ? '/graphql' : 'http://localhost:5000/graphql'}`,
  uri: `${process.env.NEXT_PUBLIC_PRODUCTION ? '/graphql' : process.env.NEXT_PUBLIC_ON_PHONE ? 'http://192.168.1.30:5000/graphql' : 'http://localhost:5000/graphql'}`,
  // uri: 'http://127.0.0.1:5000/graphql',
  cache: new InMemoryCache(),
});

export default client;
