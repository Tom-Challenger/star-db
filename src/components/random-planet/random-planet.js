import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './random-planet.css';

export default class RandomPlanet extends Component {

  // Новый синтаксис, не вошедший в стандарт
  //static updateInterval = 10000;

  constructor() {
    super();

    this.state = {
      planet: {},
      loading: true,
      error: false
    };

    this.swapiService = new SwapiService();
  }

  componentDidMount() {
    const { updateInterval } = this.props;
    this.interval = setInterval(this.updatePlanet, updateInterval);
  }

  componentWillUnmount() {
    console.log('call componentWillUnmount()')
    clearInterval(this.interval);
  }

  onPlanetLoaded = (planet) => {
    this.setState({planet, 
      loading: false});
  }

  onError = (err) => {
    this.setState({
      loading: false,
      error: true
    })
  }

  updatePlanet = () => {
    const id = Math.floor(Math.random()*15)+2;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  }

  render() {
    const {planet, loading, error} = this.state;

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={planet}/> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

/*React свойство*/
RandomPlanet.defaultProps = {
  updateInterval: 2000
}

RandomPlanet.propTypes = {
  // Не обязателное свойство
  updateInterval: PropTypes.number
  // Обязательное свойство
  //updateInterval: PropTypes.number.isRequired
}

/* Дочерний элемент фрагмент */
const PlanetView = ({planet}) => {

  const {id, name, population, 
    rotationPeriod, diameter} = planet;

  return (
    <React.Fragment>
        <img className="planet-image"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} 
             alt="planet"/>
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
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