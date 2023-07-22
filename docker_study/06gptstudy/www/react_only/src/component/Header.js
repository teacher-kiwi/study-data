import React from "react";
import { BrowserRouter, Route, Switch, Link, Routes  } from 'react-router-dom';
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
      </div>
    </div>
  );
};

export default Header;