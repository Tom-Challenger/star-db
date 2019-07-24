import React, { Component } from 'react';

import ItemList from '../item-list';
import ItemDetails, { Record } from '../item-details/item-details';

import Row from '../row';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-service';

import {
	PersonList,
	PlanetList,
	StarshipList,
	PersonDetails,
	PlanetDetails,
	StarshipDetails
} from '../sw-components';

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
	        <ItemList 
	        	onItemSelected={this.onItemSelected}
	        	data={null} 
	        	renderItem={({name, gender, birthYear}) => (
	        		<span>{`${name} (${gender} ${birthYear})`}</span>)}>
	        	{ ({name}) => <span>{name}</span>}
	        </ItemList>
 	 	);

 	 	const _personDetails = (
 	 		<ItemDetails 
 	 			itemId={this.state.selectedPerson}
 	 			getData={this.swapiService.getPerson}
 	 			getImageUrl={this.swapiService.getPersonImage}>

 	 			<Record field="gender" label="Gender" />
 	 			<Record field="eyeColor" label="Eye color" />
 	 			<Record field="birthYear" label="Gender" />
 	 		</ItemDetails>
 	 	);

 	 	const row = <Row left={itemList} right={_personDetails} />

 	 	const personList = (
 	 		<PersonList
 	 			onItemSelected={this.onItemSelected}>
				{ ({name}) => <span>{name}</span>}
			</PersonList>
		)

		const personDetails = <PersonDetails 
			itemId={this.state.selectedPerson} />

		return (
			<ErrorBoundry>
				<Row left={personList} right={personDetails} />
			</ErrorBoundry>
		)
	}
}