import React, { useCallback, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import GlobalStyle from './styles/GlobalStyle';
import BaseLayout from './navigations/BaseLayout';

function App() {
  const ws = React.useRef<any>({});

  const webSocketLogin = useCallback(() => {
    if (ws.current?.readyState !== 1) {
      ws.current = new WebSocket('ws://3.25.192.143:8081/docker/deploy');
      ws.current.onopen = () => {
        console.log('connected!!');
      };
    }
  }, []);

  useEffect(() => {
    webSocketLogin();
  }, []);

  return (
    <>
      <GlobalStyle />
      <BaseLayout ws={ws}/>
    </>
  );
}

export default App;
