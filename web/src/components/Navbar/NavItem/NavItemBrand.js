import React from 'react';
import { Link } from 'react-router-dom';

function NavItemBrand(props) {
  return (
    <div className="nav-item">
      <Link className="navbar-brand" to="/">
        <img
          src="https://cdn.worldvectorlogo.com/logos/react.svg"
          width="30"
          height="30"
          className="d-inline-block align-top mr-0 mr-md-2"
          alt=""
        />
        {props.children}{' '}
      </Link>
    </div>
  );
}

export default NavItemBrand;
