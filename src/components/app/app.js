import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import { PeoplePage, PlanetsPage, StarshipsPage } from '../pages';
import ErrorIndicator from '../error-indicator';

import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import { SwapiServiceProvider } from '../swapi-service-context'

import './app.css';

export default class App extends Component {

  state = {
    hasError: false,
    swapiService: new SwapiService()
  };

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

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    return (
    <SwapiServiceProvider value={this.state.swapiService}>
      <div className="stardb-app">
        <Header onServiceChange={this.onServiceChange} />
        <RandomPlanet updateInterval={10000} /> 

        <PeoplePage />
        <PlanetsPage />
        <StarshipsPage />
      </div>
    </SwapiServiceProvider>
    );
  }
}