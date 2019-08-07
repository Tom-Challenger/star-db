import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';

import { 
  PeoplePage, 
  PlanetsPage, 
  StarshipsPage,
  LoginPage, 
  SecretPage } from '../pages';

import ErrorIndicator from '../error-indicator';

import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import { SwapiServiceProvider } from '../swapi-service-context'

import { BrowserRouter as Router, Route} from 'react-router-dom'

import {
  PersonList,
  PlanetList,
  StarshipList,
  PersonDetails,
  PlanetDetails,
  StarshipDetails} from '../sw-components'

import './app.css';

export default class App extends Component {

  state = {
    hasError: false,
    swapiService: new SwapiService(),
    isLoggedIn: false
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    })
  }

  onServiceChange = () => {
    this.setState(
      ({ swapiService }) => {
        const Service = swapiService instanceof SwapiService ? 
                          DummySwapiService : SwapiService;
        console.log('switched to', Service.name)

        return {
          swapiService: new Service()
        }
      }
    )
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {

    const { isLoggedIn } = this.state;

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    return (
    <SwapiServiceProvider value={this.state.swapiService}>
    <Router>
        <div className="stardb-app">
          <Header onServiceChange={this.onServiceChange} />
          <RandomPlanet updateInterval={10000} /> 

          <Route path="/" render={()=><h2>Welcom to StarDB</h2>} exact={true} />
          <Route path="/people/:id?" component={PeoplePage} />
          <Route path="/planets" component={PlanetsPage} />
          <Route path="/starships" component={StarshipsPage} exact />
          <Route path="/starships/:id" 
            render={({match}) => {
              const { id } = match.params;
              return <StarshipDetails itemId={id} />
            }} />

          <Route path="/login" 
            render={() => <LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin} />} />
          <Route path="/secret"
            render={() => <SecretPage isLoggedIn={isLoggedIn} />} />

        </div>
      </Router>
    </SwapiServiceProvider>
    );
  }
}