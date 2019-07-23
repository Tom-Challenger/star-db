import React, {Component} from 'react';

import SwapiService from '../../services/swapi-service';
import ItemList from '../item-list';
import ItemDetails from '../item-details';
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
 	 			getImageUrl={this.swapiService.getStarshipImage} />
 	 	);

		return (
			<ErrorBoundry>
				<Row left={itemList} right={personDetails} />
			</ErrorBoundry>
		)
	}
}