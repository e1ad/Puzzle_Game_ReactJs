import './main.scss'

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'mobx-react';

import Stores from "./stores/stores";
import Routs from "./stores/routs";


ReactDOM.render(
    (<Provider {...Stores}>
        <Router>
            {renderRoutes(Routs)}
        </Router>
    </Provider>), document.getElementById('root'
    ));



