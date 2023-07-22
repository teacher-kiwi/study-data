import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Link, Routes  } from 'react-router-dom';
import Home from './component/Home';
import Chat from './component/Chat';
import Completions from './component/Completions';
import Edits from './component/Edits';
import Image from './component/Image';
import Header from './component/Header';
import styles from "./App.module.css";



function App() {


  return (
		<div className='App'>

      <BrowserRouter>			
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="/completions" element={<Completions />}></Route>
          <Route path="/edits" element={<Edits />}></Route>
          <Route path="/image" element={<Image />}></Route> 
        </Routes>
      </BrowserRouter>
 		</div>
	);
}

export default App;
