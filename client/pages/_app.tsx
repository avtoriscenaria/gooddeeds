import 'styles/global.css';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { useApi } from 'src/hooks';
import {store} from 'src/redux/store';
import { api } from 'src/constants/api'
import { LSItems, publicPaths } from 'src/constants';
import { LSGetter } from 'src/helpers';
import { useRouter } from 'next/router';

interface AppProps {
  Component: React.ComponentType;
  pageProps: any;
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const {request} = useApi()

  useEffect(() => {
    checkAuth(router.asPath)

    const hideContent = () => setIsAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    router.events.on('routeChangeComplete', checkAuth)

    return () => {
        router.events.off('routeChangeStart', hideContent);
        router.events.off('routeChangeComplete', checkAuth);
    }
  }, [])

  const checkAuth = async (url: string) => {
    const path = url.split('?')[0];
    console.log('path', path)
    const authData = LSGetter(LSItems.AUTH)
    
    if(!authData && !publicPaths.includes(path)) {
      setIsAuthorized(false);
      router.push({
          pathname: '/login',
          query: { returnUrl: router.asPath }
      });
    } else {
      setIsAuthorized(true);
    }
  }

  return (
    <Provider store={store}>
      {
        isAuthorized && 
        <Component {...pageProps} />
      }
      
    </Provider>
  );
};

export default App;