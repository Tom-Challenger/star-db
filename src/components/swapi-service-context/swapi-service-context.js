import React from 'react'

const {
	Provider : SwapiServiceProvider, 
	Consumer : SwapiServiceConsumer
} = React.createContext();
/*createContext - принимать значение по-умолчанию (опционально)
Если наш Consumer не сможет найти Provider'а
он будет использовать значение по-умолчанию*/

export {
	SwapiServiceProvider,
	SwapiServiceConsumer
}