import React, { Component } from 'react';

import { PersonList, PersonDetails } from '../sw-components'
import Row from '../row';
import ErrorBoundry from '../error-boundry';

export default class PeoplePage extends Component {

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
					left={<PersonList onItemSelected={this.onItemSelected} />} 
					right={<PersonDetails itemId={this.state.selectedItem} />} />
			</ErrorBoundry>
		)
	}
}