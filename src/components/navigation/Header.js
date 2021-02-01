import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <header>
        <div className="header-wrapper">
          <nav>
            <div className="logo">
              <h3>NM</h3>
            </div>

            <ul>
              <li>portfolio</li>
              <li>contact</li>
            </ul>
          </nav>{" "}
          {/* ------------  */}
          {/* ------------  */}
          {/* ------------  */}
          <div className="bio-nav">
            <p>
              I'm Nadia Mariduena, a Web &amp; 3D designer based in Berlin//
              Germany.
            </p>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
