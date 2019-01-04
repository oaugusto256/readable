import React from 'react';
import { MdSearch, MdMenu } from 'react-icons/md';

const Navbar = () => {
  return (
    <div className="container">
      <nav>
        <span>Readable</span>
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