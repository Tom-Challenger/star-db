import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

import './random-planet.css';

export default class RandomPlanet extends Component {

  constructor() {
    super();

    this.state = {
      planet: {},
      loading: true
    };

    this.swapiService = new SwapiService();
	
	this.updatePlanet();
  }

  onplanetLoaded = (planet) => {
    this.setState({planet, 
      loading: false});
  }

  updatePlanet() {
    const id = Math.floor(Math.random()*15)+2;
    this.swapiService
      .getPlanet(id)
      .then(this.onplanetLoaded);
  }

  render() {
    const {planet, loading} = this.state;

    const spinner = loading ? <Spinner /> : null;
    const content = !loading ? <PlanetView planet={planet}/> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {spinner}
        {content}
      </div>
    );
  }
}

/* Дочерний элемент фрагмент */
const PlanetView = ({planet}) => {

  const {id, name, population, 
    rotationPeriod, diameter} = planet;

  return (
    <React.Fragment>
        <img className="planet-image"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotate Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
    </React.Fragment>
  );
}