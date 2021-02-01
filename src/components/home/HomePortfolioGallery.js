import React from "react";

import PortfolioData from "./portfolio.json";

function HomePortfolioGallery() {
  return (
    <React.Fragment>
      <div className="wrapper-portfolio">
        {PortfolioData.map((cardData, index) => {
          return (
            <div className="container-card" key={cardData.id}>
              <div className="quote">
                <h2>
                  TEXT <span className="outline">{cardData.title1}</span>
                </h2>
                <img
                  className="img-container"
                  src={cardData.img1}
                  alt={cardData.alt}
                />

                {/* ------------------------ */}
                <div className="portfolio-quote">
                  <h2>
                    TEXTc <span className="outline">{cardData.title2}</span>
                  </h2>

                  <h4>
                    TEXT <span className="outline">{cardData.year}</span>
                  </h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}

export default HomePortfolioGallery;
