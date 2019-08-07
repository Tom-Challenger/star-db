import React from 'react';
import { withRouter } from 'react-router-dom'

import { StarshipList } from '../sw-components'
import ErrorBoundry from '../error-boundry'

const StarshipsPage = ({ history }) => {
	return (
		<ErrorBoundry>
			<StarshipList 
				onItemSelected={(id) => history.push(id)} />
		</ErrorBoundry>
	)
}

export default withRouter(StarshipsPage)