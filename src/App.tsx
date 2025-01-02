import { Inductor, InductorMultiplier, InductorTolerance, Mode, NumberOfBands, Resistor, ResistorTolerance } from './types'
import { InductorPicture, ResistorPicture } from './Resistor'
import { InductorTable, ResistorTable } from './Table'
import { InductorValue, ResistorValue } from './Value'
import { ModeSelector } from './ModeSelector'
import { NumberOfBandsSelector } from './NumberOfBandsSelector'
import { useState } from 'react'

const App = () => {
	type Component = Resistor | Inductor

	const [mode, setMode] = useState('Resistor' as Mode)
	const [numberOfBands, setNumberOfBands] = useState(4 as NumberOfBands)
	const [component, setComponent] = useState({
		digit1: 'Red',
		digit2: 'Black',
		digit3: 'Black',
		multiplier: 'Red',
		tolerance: 'Gold',
		tc: 'Yellow',
	} as Component)

	const setModeWrapper = (m: Mode) => {
		if (m == mode) {
			return
		}

		setMode(m)

		if (m == 'Inductor') {
			if (numberOfBands == 3) {
				setNumberOfBands(4)
			} else if (numberOfBands == 6) {
				setNumberOfBands(5)
			}

			let multiplier: InductorMultiplier = 'Black'
			switch (component.multiplier) {
				case 'Violet':
				case 'Grey':
				case 'White':
					multiplier = 'Blue'
					break
				default:
					multiplier = component.multiplier
			}

			let tolerance: InductorTolerance = 'Black'
			switch (component.tolerance) {
				case 'Green':
				case 'Blue':
				case 'Violet':
					tolerance = 'Yellow'
					break
				default:
					tolerance = component.tolerance
			}

			const inductor: Inductor = {
				digit1: component.digit1,
				digit2: component.digit2,
				multiplier: multiplier,
				tolerance: tolerance,
			}

			setComponent(inductor)
		} else {
			let tolerance: ResistorTolerance = 'Brown'
			switch (component.tolerance) {
				case 'Black':
					tolerance = 'Brown'
					break
				case 'Orange':
				case 'Yellow':
					tolerance = 'Red'
					break
				default:
					tolerance = component.tolerance
			}

			const resistor: Resistor = {
				digit1: component.digit1,
				digit2: component.digit2,
				digit3: 'Black',
				multiplier: component.multiplier,
				tolerance: tolerance,
				tc: 'Yellow',
			}

			setComponent(resistor)
		}
	}

	return (
		<>
			<ModeSelector mode={mode} setMode={setModeWrapper} />
			<NumberOfBandsSelector mode={mode} numberOfBands={numberOfBands} setNumberOfBands={setNumberOfBands} />
			{mode == 'Resistor' ? (
				<>
					<ResistorPicture resistor={component as Resistor} numberOfBands={numberOfBands} />
					<ResistorValue resistor={component as Resistor} numberOfBands={numberOfBands} />
					<ResistorTable resistor={component as Resistor} numberOfBands={numberOfBands} setResistor={setComponent as React.Dispatch<React.SetStateAction<Resistor>>} />
				</>
			) : (
				<>
					<InductorPicture inductor={component as Inductor} numberOfBands={numberOfBands} />
					<InductorValue inductor={component as Inductor} />
					<InductorTable inductor={component as Inductor} setInductor={setComponent as React.Dispatch<React.SetStateAction<Inductor>>} />
				</>
			)}
		</>
	)
}

export default App
