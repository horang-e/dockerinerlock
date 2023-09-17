import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../components/pages/Home';
import Layout from '../components/blocks/Layout';
import Volume from '../components/pages/volume';
import Local from '../components/pages/image/local';
import Server from '../components/pages/image/server';

const BaseLayout = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/volume" element={<Volume />} />
          <Route path="/image/local" element={<Local />} />
          <Route path="/image/server" element={<Server />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default BaseLayout;
