import React, { Component } from 'react';

import Spinner from '../spinner';

import './item-details.css';

const Record = ({item, field, label}) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{ item[field] }</span>
    </li>
  )
}

export {
  Record
}

export default class ItemDetails extends Component {

  state = {
    item: null,
    image: null,
    loading: false,
    waiting: true
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  onItemLoaded = (item) => {
    this.setState({
      item,
      image: this.props.getImageUrl(item),
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

  updateItem() {
    const {itemId, getData, getImageUrl} = this.props;
    // Проверяем что itemId не null
    if (!itemId) {
      this.onWait();
      return;
    }

    this.onLoad();

    getData(itemId)
      .then(this.onItemLoaded);
  }

  render() {

    const {item, image, loading, waiting} = this.state;

    const hasData = !(loading || waiting);
    const children = this.props.children;

    const infoMessage = waiting ? <InfoIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PersonView person={item} image={image} children={children} /> : null;
    
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

const PersonView = ({person, image, children}) => {

 const {id, name, gender, birthYear, eyeColor} = person;

  return (
    <React.Fragment>
        <img className="person-image"
          src={image}
          alt="person"/>

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
           { 
              React.Children.map(children, (child) => {
                return React.cloneElement(child, {item:person});
              })
           }
          </ul>
        </div>
    </React.Fragment>
  );
}