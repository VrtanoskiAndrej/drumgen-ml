import React from 'react';

function NavItemBrand(props) {
  return (
    <div className="nav-item">
      <a className="navbar-brand">
        <img
          src="https://cdn.worldvectorlogo.com/logos/react.svg"
          width="30"
          height="30"
          className="d-inline-block align-top mr-0 mr-md-2"
          alt=""
        />
        {props.children}{' '}
      </a>
    </div>
  );
}

export default NavItemBrand;
