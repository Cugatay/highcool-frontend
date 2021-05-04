import React, { useMemo, useState } from 'react';
import '../styles/globals.scss';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import UserContext from '../context/UserContext';
import PageContext from '../context/PageContext';

const client = new ApolloClient({
  // uri: `http://${process.env.NEXT_PUBLIC_PRODUCTION ? 'backend' : 'localhost'}:5000/graphql`,
  uri: 'http://127.0.0.1:5000/graphql',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  const [userValue, setUserValue] = useState({});
  const [pageValue, setPageValue] = useState({});
  const userValueProvider = useMemo(() => ({ userValue, setUserValue }), [userValue, setUserValue]);
  const pageValueProvider = useMemo(() => ({ pageValue, setPageValue }), [pageValue, setPageValue]);

  return (
    <ApolloProvider client={client}>
      <PageContext.Provider value={pageValueProvider}>
        <UserContext.Provider value={userValueProvider}>
          <Component {...pageProps} />
        </UserContext.Provider>
      </PageContext.Provider>
    </ApolloProvider>
  );
}

export default MyApp;
