import React, { Component } from "react";
import ScrollToTop from "./HomeScrollToTop";
//
//

class HomeContact extends Component {
  state = {
    links: [
      {
        id: "0",
        target: "https://github.com/nadiamariduena",
        label: "Github",
      },
      {
        id: "1",
        target: "https://www.linkedin.com/in/nadia-mariduena/",
        label: "LinkedIn",
      },
    ],
  };
  render() {
    return (
      <React.Fragment>
        <div className="container-contact">
          <section className="contact">
            <div className="wrapper-contact">
              {/* ----------------------------------------- */}
              {/*             BACK TO TOP                   */}
              {/* ----------------------------------------- */}
              <ScrollToTop />
              {/* ----------------------------------------- */}
              {/* ----------------------------------------- */}
              {/* ----------------------------------------- */}
              <div className="cont-lnk-wrapper">
                <div className="cont-links">
                  <h3> CONTACT</h3>
                  <ul>
                    <li>N.MARIDUENA@TUTANOTA.COM</li>
                  </ul>
                </div>
                {/* ---------------------- */}
                <div className="cont-links">
                  <h3> FOLLOW</h3>
                  {this.state.links.map((link) => {
                    return (
                      <ul key={link.id}>
                        <li>
                          <a
                            href={link.target}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {link.label}
                          </a>
                        </li>
                      </ul>
                    );
                  })}
                </div>
                {/* ---------------------- */}
                <div className="cont-links">
                  <h3>
                    {" "}
                    &#169; NADIAMARIDUENA <span> 2020</span>
                  </h3>
                </div>
              </div>
              {/* ----------------------------------------- */}
              {/* ----------------------------------------- */}
              {/* ----------------------------------------- */}
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default HomeContact;
