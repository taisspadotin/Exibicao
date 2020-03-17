import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from '../paginas/home/home';
import Buscar from '../paginas/buscar/buscar';

const Main = () =>(
	<Switch>
		<Route exact path="/" component={Home} />
		<Route path="/buscar" component={Buscar} />
	</Switch>
)
export default Main;
