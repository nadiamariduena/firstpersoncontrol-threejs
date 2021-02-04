import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//

//
import Home from "./components/home/Home";

class App extends Component {
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="App">
          <div id="wrapper-app">
            <Switch>
              <Route exact path="/" component={Home} />
              {/* <Route exact path="/portfolio" component={Portfolio} /> */}
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
