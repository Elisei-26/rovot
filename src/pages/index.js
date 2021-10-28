import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./login";
import Logout from "./logout";
import Register from "./register";
import Home from "./home";
import Vot from "./vot";

const Webpages = () => {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/register" component={Register} />
        <Route path="/vot" component={Vot} />
        <Route path="/home" component={Home} />
      </Router>
    </div>
  );
};

export default Webpages;
