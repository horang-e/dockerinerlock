import React from 'react';
import logo from './logo.svg';
import './App.css';
import GlobalStyle from './styles/GlobalStyle';
import BaseLayout from './navigations/BaseLayout';

function App() {
  return (
    <>
      <GlobalStyle />
      <BaseLayout />
    </>
  );
}

export default App;
