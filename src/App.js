import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//

//
import Home from "./components/home/Home";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div id="wrapper-app">
            <Switch>
              <Route exact path="/" component={Home} />
              {/* <Route exact path="/portfolio" component={Portfolio} /> */}
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
