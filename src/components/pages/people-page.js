import React from 'react'
import { withRouter } from 'react-router-dom'

import { PersonList, PersonDetails } from '../sw-components'
import Row from '../row'
import ErrorBoundry from '../error-boundry'

const PeoplePage = ({ match, history }) => {

	const { id } = match.params;

	return (
		<ErrorBoundry>
			<Row 
				left={<PersonList onItemSelected={(id) => history.push(id)} />} 
				right={<PersonDetails itemId={id} />} />
		</ErrorBoundry>
	)
}

export default withRouter(PeoplePage)