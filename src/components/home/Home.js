import React from 'react';

// import Header from "../navigation/Header";
import TropicalVoid from '../3dScenes/TropicFirstPerson';
// import HomePortfolioGallery from "./HomePortfolioGallery";
import ContactSection from "./HomeContact";
// import FooterTextAnimation from "./HomeFooterText";

//

function Home() {
  return (
    <React.Fragment>
      {/* --------------- */}
      {/* --------------- */}
      {/* --------------- */}
      {/* <Header /> */}
      {/* --------------- */}
      {/* --------------- */}
      {/* --------------- */}
      <section className="container-section-scene-home">
        {/* ----------------------------------------- */}
        {/*             FLAG SECTION                  */}
        {/* ----------------------------------------- */}
        <div className="scene-threejs">
          <div className="wrapper-flag-scene-threejs">
            {/* ----------------------------------------- */}

            <div className="wrapper-scene-oblivion">
              <TropicalVoid />
            </div>
            {/* ----------------------------------------- */}

            {/* <div className="scene-description-home">
              <div className="wrapper-scene-description-home">
                <h3 className="h3-text-img-home">
                  Featured work
                </h3>
                <p>
                  Website for Meyoko's artworks, I created
                  during my time at DCI. Additional
                  illustration by Meyoko
                </p>
              </div>
            </div> */}
            {/* ----------------------------------------- */}
          </div>
        </div>
      </section>
      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}
      {/* <section className="container-gallery">
        <HomePortfolioGallery />
      </section> */}

      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}

      {/* ----------------------------------------- */}
      {/*             CONTACT SECTION               */}
      {/* ----------------------------------------- */}
      {/* <ContactSection /> */}
      {/* --------------- */}
      {/* <FooterTextAnimation /> */}
    </React.Fragment>
  );
}

export default Home;
