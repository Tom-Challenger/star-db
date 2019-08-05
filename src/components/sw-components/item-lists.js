import React from 'react';
import ItemList from '../item-list';
import { withData, withSwapiService, withChildFunction, compose } from '../hoc-helpers';

const mapPersonMethodsToProps = (swapiService) => {
	return {
		getData: swapiService.getAllPeople
	}
}

const mapPlanetMethodsToProps = (swapiService) => {
	return {
		getData: swapiService.getAllPlanets
	}
}

const mapStarshipMethodsToProps = (swapiService) => {
	return {
		getData: swapiService.getAllStarships
	}
}

const renderName = ({name}) => <span>{name}</span>
//for example 
//const renderModelAndName = ({model, name}) => <span>{name} ({model})</span>

const PersonList = compose(
						withSwapiService(mapPersonMethodsToProps),
						withData,
						withChildFunction(renderName)
					)(ItemList);

const PlanetList = compose(
					  withSwapiService(mapPlanetMethodsToProps),
					  withData,
					  withChildFunction(renderName)
					)(ItemList)

//Способ форматирования цепочки вызовов без функции compose
const StarshipList = withSwapiService(mapStarshipMethodsToProps)(
						withData(
							withChildFunction(renderName)(
								ItemList)));

export {
	PersonList,
	PlanetList,
	StarshipList
};