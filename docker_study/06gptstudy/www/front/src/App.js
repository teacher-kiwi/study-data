import React from 'react';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import Home from './component/Home';
import Chat from './component/Chat';
import Completions from './component/Completions';
import Edits from './component/Edits';
import Image from './component/Image';
import Header from './component/Header';
import Tesseract from './component/Tesseract';
import Naver from './component/Naver';
import Google from './component/Google';

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
          <Route path="/tesseract" element={<Tesseract />}></Route> 
          <Route path="/naver" element={<Naver />}></Route> 
          <Route path="/google" element={<Google />}></Route> 
        </Routes>
      </BrowserRouter>
 		</div>
	);
}

export default App;
