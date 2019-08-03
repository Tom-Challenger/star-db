import React, {Component} from 'react';

import ItemDetails, { Record } from '../item-details/item-details';
import { SwapiServiceConsumer } from '../swapi-service-context'
import { withSwapiService } from '../hoc-helpers'

import PersonDetails from './person-details'


const PlanetDetails = ({itemId}) => {

	return (
		<SwapiServiceConsumer>
		{
			({getPlanet, getPlanetImage}) => {
				return (
					<ItemDetails 
						itemId={itemId}
						getData={getPlanet}
						getImageUrl={getPlanetImage}>

						<Record field="population" label="Population" />
						<Record field="rotationPeriod" label="Rotation Period" />
						<Record field="diameter" label="Diameter" />
					</ItemDetails>
				)
			}
		}
		</SwapiServiceConsumer>
	)
}

const StarshipDetails = ({itemId}) => {

	return (
		<SwapiServiceConsumer>
		{
			({getStarship, getStarshipImage}) => {
				return (
					<ItemDetails 
						itemId={itemId}
						getData={getStarship}
						getImageUrl={getStarshipImage}>

						<Record field="model" label="Model" />
						<Record field="length" label="Length" />
						<Record field="costInCredits" label="Cost" />
					</ItemDetails>
				)
			}
		}
		</SwapiServiceConsumer>
	)
}

export {
	PersonDetails,
	PlanetDetails,
	StarshipDetails
}