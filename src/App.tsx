import { NumberOfBands, Resistor } from './types'
import { NumberOfBandsSelector } from './NumberOfBandsSelector'
import { ResistorPicture } from './Resistor'
import { Table } from './Table'
import { Value } from './Value'
import { useState } from 'react'

const App = () => {
	const [numberOfBands, setNumberOfBands] = useState(4 as NumberOfBands)
	const [resistor, setResistor] = useState({
		digit1: 'Red',
		digit2: 'Black',
		digit3: 'Black',
		multiplier: 'Red',
		tolerance: 'Gold',
		tc: 'Yellow',
	} as Resistor)

	return (
		<>
			<NumberOfBandsSelector numberOfBands={numberOfBands} setNumberOfBands={setNumberOfBands} />
			<ResistorPicture resistor={resistor} numberOfBands={numberOfBands} />
			<Value resistor={resistor} numberOfBands={numberOfBands} />
			<Table numberOfBands={numberOfBands} setResistor={setResistor} resistor={resistor} />
		</>
	)
}

export default App
