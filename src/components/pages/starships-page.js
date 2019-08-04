import React, { Component } from 'react';

import { StarshipList, StarshipDetails } from '../sw-components'
import Row from '../row';
import ErrorBoundry from '../error-boundry';

export default class StarshipsPage extends Component {

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
					left={<StarshipList onItemSelected={this.onItemSelected} />} 
					right={<StarshipDetails itemId={this.state.selectedItem} />} />
			</ErrorBoundry>
		)
	}
}