import React from 'react'
import Home from './pages/home'
import GameVsPC from './components/GameVsPc/GameVsPC'
import GameVsPlayer from './components/GameVsUser/GameVsPlayer'
import Menu from './components/tools/menu'
import Footer from './components/tools/fotter'
import { BrowserRouter, Route, Switch } from "react-router-dom";



function App() {

  return (

    <BrowserRouter>

      <Menu />

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/GameVsPC" exact component={GameVsPC} />
        <Route path="/GameVsPlayer" exact component={GameVsPlayer} />

      </Switch>

      <Footer />

    </BrowserRouter>

  );
}

export default App;
