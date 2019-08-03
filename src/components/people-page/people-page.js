import React, { Component } from 'react';

import Row from '../row';
import ErrorBoundry from '../error-boundry';

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

	state = {
		selectedPerson: null
	}

	onItemSelected = (id) => {
		this.setState({
		  selectedPerson: id
		});
	};

	render() {

 	 	const personList = (
 	 		<PersonList
 	 			onItemSelected={this.onItemSelected}>
			</PersonList>
		)

		const personDetails = (
			<PersonDetails 
				itemId={this.state.selectedPerson} />
		)

		return (
			<ErrorBoundry>
				<Row left={personList} right={personDetails} />
			</ErrorBoundry>
		)
	}
}