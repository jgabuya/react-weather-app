import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/app.css';

import registerServiceWorker from './registerServiceWorker';

let apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
let apiKey = 'bde2f30c870589ffb997fb02bd3d3625';

ReactDOM.render(<App apiUrl={apiUrl} apiKey={apiKey} />, document.getElementById('root'));
registerServiceWorker();
