import React from 'react';
import NavItem from './NavItem/NavItem';
import NavItemBrand from './NavItem/NavItemBrand';

function Navbar() {
  return (
    <div className="header">
      <nav className="navbar py-3 sticky-top navbar-expand-lg navbar-dark bg-dark container">
        <NavItemBrand>
          <strong>DrumGen</strong> ML
        </NavItemBrand>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="nav navbar-nav ">
            <NavItem location="/"> Docs </NavItem>
            <NavItem location="/sandbox"> Sandbox </NavItem>
            <NavItem location="/donate"> Donate </NavItem>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
