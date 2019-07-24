import React, { Component } from 'react';

import './item-details.css';
import Spinner from '../spinner';

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

const InfoIndicator = () => {
  return <span>Selected a person from a list</span>
}

export default class ItemDetails extends Component {

  state = {
    item: null,
    image: null,

    loading: false,
    waiting: true
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  onWait() {
    this.setState({
      loading: false,
      waiting: true
    });
  }

  onLoad() {
    this.setState({
      loading: true, 
      waiting: false
    });
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      this.onWait();
      return;
    }

    this.onLoad();

    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          image: this.props.getImageUrl(item),
          loading: false
        })
      })
  }

  render() {
    const {loading, waiting} = this.state;

    if (waiting) {
      return <InfoIndicator />
    }

    if (loading) {
      return <Spinner />
    }

    const { item, image } = this.state;
    const { name } = item;

    return (
      <div className="item-details card">
        <img className="item-image"
          src={image}
          alt="item"/>

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, { item });
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}