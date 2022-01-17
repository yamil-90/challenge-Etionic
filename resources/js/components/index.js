import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import Home from './Home';
import Favorites from './Favorites'

const SwitchNavigator = () => (

    <BrowserRouter>
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/my-favorites" element={<Favorites />} />
        </Routes>
    </BrowserRouter>
)

if (document.getElementById('mainApp')) {
    ReactDOM.render(<SwitchNavigator />, document.getElementById('mainApp'));
}
