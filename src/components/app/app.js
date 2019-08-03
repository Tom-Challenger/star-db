import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';
import ErrorIndicator from '../error-indicator';

import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import { SwapiServiceProvider } from '../swapi-service-context'

import './app.css';

export default class App extends Component {

  swapiService = new DummySwapiService();

  state = {
    hasError: false
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    return (
    <SwapiServiceProvider value={this.swapiService}>
      <div className="stardb-app">
        <Header />
        <RandomPlanet /> 

        <PeoplePage />
      </div>
    </SwapiServiceProvider>
    );
  }
}