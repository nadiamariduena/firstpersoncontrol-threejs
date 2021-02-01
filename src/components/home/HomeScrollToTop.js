import React, { useState } from "react";

const ScrollToTop = () => {
  // Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.
  // Declare a new state variable, which we'll call "showScroll"
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    setShowScroll(true);
    //  If showScroll is true, show the arrow. If it is false, hide the arrow.
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Our top value is 0 because all we want this arrow to do is scroll the window back to the top of the page
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
  };

  window.addEventListener("scroll", checkScrollTop);

  return (
    <React.Fragment>
      <div className="back-to-top">
        <h1
          className="scrollTop"
          onClick={scrollTop}
          style={{ display: showScroll }}
        >
          {" "}
          Back to top <span>&#10230; </span>
        </h1>
      </div>
    </React.Fragment>
  );
};

export default ScrollToTop;

// https://medium.com/better-programming/create-a-scroll-to-top-arrow-using-react-hooks-18586890fedc
