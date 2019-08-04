import React, { Component } from 'react';

import { PlanetList, PlanetDetails } from '../sw-components'
import Row from '../row';
import ErrorBoundry from '../error-boundry';

export default class PlanetsPage extends Component {

	state = {
		selectedItem: null
	}

	onItemSelected = (selectedItem) => {
		this.setState({ selectedItem });
	};

	render() {
		return (
			<ErrorBoundry>
				<Row 
					left={<PlanetList onItemSelected={this.onItemSelected} />} 
					right={<PlanetDetails itemId={this.state.selectedItem} />} />
			</ErrorBoundry>
		)
	}
}