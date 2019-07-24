import React from 'react';

import ItemDetails, { Record } from '../item-details/item-details';
import SwapiService from '../../services/swapi-service';

const swapiService = new SwapiService();

const {
	getPerson,
	getPlanet,
	getStarship,
	getPersonImage,
	getPlanetImage,
	getStarshipImage
} = swapiService;

const PersonDetails = ({itemId}) => {

	return (
		<ItemDetails 
			itemId={itemId}
			getData={getPerson}
			getImageUrl={getPersonImage}>

			<Record field="gender" label="Gender" />
			<Record field="eyeColor" label="Eye color" />
			<Record field="birthYear" label="Gender" />
		</ItemDetails>
	);
}

const PlanetDetails = () => {}

const StarshipDetails = () => {}

export {
	PersonDetails,
	PlanetDetails,
	StarshipDetails
}