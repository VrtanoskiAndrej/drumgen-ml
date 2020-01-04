import React from 'react';
import { Link } from 'react-router-dom';

function NavItem(props) {
  return (
    <li className="nav-item mx-1">
      <Link className="nav-link" to={props.location}>
        {props.children}
      </Link>
    </li>
  );
}

export default NavItem;
