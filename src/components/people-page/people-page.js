import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import ItemList from '../item-list';
import ItemDetails, { Record } from '../item-details/item-details';
import ErrorBoundry from '../error-boundry';
import Row from '../row';

import './people-page.css'


export default class PeoplePage extends Component {
	
	swapiService = new SwapiService();

	state = {
		selectedPerson: null
	}

	onItemSelected = (id) => {
		this.setState({
		  selectedPerson: id
		});
	};	

	render() {

 	 	const itemList = (
	        <ItemList onItemSelected={this.onItemSelected}
	        	getData={this.swapiService.getAllPeople} 
	        	renderItem={({name, gender, birthYear}) => (
	        		<span>{`${name} (${gender} ${birthYear})`}</span>)} 
	        />
 	 	);

 	 	const personDetails = (
 	 		<ItemDetails 
 	 			itemId={this.state.selectedPerson}
 	 			getData={this.swapiService.getPerson}
 	 			getImageUrl={this.swapiService.getPersonImage}>

 	 			<Record field="gender" label="Gender" />
 	 			<Record field="eyeColor" label="Eye color" />
 	 			<Record field="birthYear" label="Gender" />
 	 		</ItemDetails>
 	 	);

		return (
			<ErrorBoundry>
				<Row left={itemList} right={personDetails} />
			</ErrorBoundry>
		)
	}
}