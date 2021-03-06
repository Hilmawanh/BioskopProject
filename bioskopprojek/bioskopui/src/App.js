import React from "react";
import Header from "./components/header";
import "./App.css";
import Home from "./pages/home";
import { Switch, Route } from "react-router-dom";
import ManageAdmin from "./pages/manageadmin";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path={"/"} exact>
          <Home />
        </Route>
        <Route path={"/manageadmin"} exact>
          <ManageAdmin />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
