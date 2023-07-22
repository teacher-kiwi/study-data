import React from "react";
import { Link  } from 'react-router-dom';
import "./Header.css";

const MenuItem = ({ active, children, to }) => (
    <Link to={to} className="menuitem">
            {children}
    </Link>
);

const Header = () => {
  return (
    <div>
      <div className="menu">
        <MenuItem to={'/'}>홈</MenuItem>
        <MenuItem to={'/chat'}>chat</MenuItem>
        <MenuItem to={'/completions'}>completions</MenuItem>
        <MenuItem to={'/edits'}>edits</MenuItem>
        <MenuItem to={'/image'}>image</MenuItem>
        <MenuItem to={'/tesseract'}>tesseract</MenuItem>
        <MenuItem to={'/naver'}>naver</MenuItem>
        <MenuItem to={'/google'}>google</MenuItem>
      </div>
    </div>
  );
};

export default Header;