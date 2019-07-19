import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

import './person-details.css';

export default class PersonDetails extends Component {

  swapiService = new SwapiService();

  state = {
    person: null,
    loading: false,
    waiting: true
  }

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.updatePerson();
    }
  }

  onPersonLoaded = (person) => {
    this.setState({
      person, 
      loading: false
    });
  }

  onLoad = () => {
    this.setState({
      loading: true, 
      waiting: false
    });
  }

  onWait = () => {
    this.setState({
      loading: false,
      waiting: true
    })
  }

  updatePerson() {
    const {personId} = this.props;
    // Проверяем что personId не null
    if (!personId) {
      this.onWait();
      return;
    }

    this.onLoad();

    this.swapiService
      .getPerson(personId)
      .then(this.onPersonLoaded);
  }

  render() {

    const {person, loading, waiting} = this.state;

    const hasData = !(loading || waiting);

    const infoMessage = waiting ? <InfoIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PersonView person={person}/> : null;

    if (loading) {
      this.foo.bar = 0;
    }

    return (
      <div className="person-details card">
        {infoMessage}
        {spinner}
        {content}
      </div>
    )
  }
}


/* Дочерний элемент фрагмент */
const InfoIndicator = () => {
  return <span>Selected a person from a list</span>
}

const PersonView = ({person}) => {

 const {id, name, gender, birthYear, eyeColor} = person;

  return (
    <React.Fragment>
        <img className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
          alt="person"/>

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul> 
        </div>
    </React.Fragment>
  );
}