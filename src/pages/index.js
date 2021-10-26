import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import Login from './login';
import Register from './register';
import Home from './home';
import Vot from './vot';

const Webpages = () => {
    return(
      <div>
        <Router>
            <Route exact path="/" component= {Home} />
            <Route path = "/login" component = {Login} />
            <Route path = "/register" component = {Register} />
            <Route path = "/vot" component = {Vot} />
        </Router>
        <Router>
          <Route exact path="/" component= {Vot} />
          <Route path = "/home" component = {Home} />
        </Router>
      </div>
    );
};
export default Webpages;

/*Ca sa mai adaugi o pagina:

Creezi o pagina normala in src/pages/

Si aici in fisier, ii dai import:
import Home from './home';
import ObiectPaginamea from './paginamea';

Si adaugi pe linia 15:

<Route path = "/login" component = {Login} />
<Route path = "/paginamea" component = {ObiectPaginamea} />
*/