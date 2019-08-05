import React from 'react';
import PropTypes from 'prop-types';

import './row.css';

const Row = ({left, right}) => {
	return (
		<div className="row mb2">
          <div className="col-md-6">
          	{left}
          </div>
          <div className="col-md-6">
            {right}
          </div>
        </div>
	)
}

Row.propTypes = {
  // .node - это что-то, что можно отрендарить в JSX
  // .element - это только для react-элементов
  left: PropTypes.node,
  right: PropTypes.node
}

export default Row;