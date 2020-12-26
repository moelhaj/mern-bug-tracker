import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { Private, Public } from "./Route";
import "./App.css";

// Components
import Home from "./Components";
import Login from "./Components/Login";

function App() {
    return <BrowserRouter>
        <Switch>
            <Private exact path="/" component={Home} />
            <Public exact path="/login" component={Login} />
        </Switch>
    </BrowserRouter>;
}

export default App;
