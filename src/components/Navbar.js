import React from 'react';
import { MdSearch, MdMenu } from 'react-icons/md';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="container">
      <nav>
        <Link className="nav-home" to={'/'}>
          <span>Readable</span>
        </Link>
        <div className="nav-icons-container">
          <div className="nav-icon">
            <MdSearch />
          </div>
          <div className="nav-icon">
            <MdMenu />
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;