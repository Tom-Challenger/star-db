import React from 'react';
import { withRouter } from 'react-router-dom'

import { StarshipList } from '../sw-components'
import ErrorBoundry from '../error-boundry'

const StarshipsPage = ({ history }) => {
	return (
		<ErrorBoundry>
			<StarshipList 
				onItemSelected={(itemId) => {
					return history.push(`/starships/${itemId}`)
				}} />
		</ErrorBoundry>
	)
}

export default withRouter(StarshipsPage)