import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../components/pages/Home';
import Layout from '../components/blocks/Layout';
import Volume from '../components/pages/volume';
import Local from '../components/pages/image/local';
import Server from '../components/pages/image/server';

export interface WsProps {
  ws: React.MutableRefObject<any>;
}

const BaseLayout = (props: WsProps) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home ws={props.ws} />} />
          <Route path="/volume" element={<Volume  ws={props.ws}/>} />
          <Route path="/image/local" element={<Local  ws={props.ws}/>} />
          <Route path="/image/server" element={<Server  ws={props.ws}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default BaseLayout;
