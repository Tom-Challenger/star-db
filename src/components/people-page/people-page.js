import React, {Component} from 'react';

import SwapiService from '../../services/swapi-service';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './people-page.css'

export default class PeoplePage extends Component {
	
	swapiService = new SwapiService();

	state = {
		selectedPerson: null,
		hasError: false
	}

	componentDidCatch() {
		this.setState({
			hasError: true
		})
	}

	onItemSelected = (id) => {
		this.setState({
		  selectedPerson: id
		});
	};	

	render() {

		if (this.state.hasError) {
 	 		return <ErrorIndicator />
 	 	}

		return (
			<div className="row mb2">
	          <div className="col-md-6">
	            <ItemList onItemSelected={this.onItemSelected}
	            	getData={this.swapiService.getAllPeople} 
	            	renderItem={({name, gender, birthYear}) => (
	            		<span>{`${name} (${gender} ${birthYear})`}</span>)} 	
	            />
	          </div>
	          <div className="col-md-6">
	            <PersonDetails personId={this.state.selectedPerson} />
	          </div>
	        </div>
		)
	}
}