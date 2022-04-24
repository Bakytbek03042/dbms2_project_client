import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home/";
import { Filters } from "./pages/Filters";
import CreateFilter from "./pages/CreateFilter/CreateFilter";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/filter/new" component={CreateFilter} />
        <Route path="/filter/:id" component={CreateFilter} />
        <Route path="/filter" component={Filters} />
        <Route default component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
