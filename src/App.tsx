import {
	Capacitor,
	CapacitorMultiplier,
	CapacitorTolerance,
	CapacitorType,
	Component,
	Inductor,
	InductorMultiplier,
	InductorTolerance,
	Mode,
	NumberOfBands,
	Resistor,
	ResistorTolerance,
} from './types'
import { CapacitorPicture, InductorPicture, ResistorPicture } from './Resistor'
import { CapacitorTable, InductorTable, ResistorTable } from './Table'
import { CapacitorValue, InductorValue, ResistorValue } from './Value'
import { Language, translate } from './lang'
import { CapacitorTypeSelector } from './CapacitorTypeSelector'
import { LanguageSelector } from './LanguageSelector'
import { ModeSelector } from './ModeSelector'
import { NumberOfBandsSelector } from './NumberOfBandsSelector'
import { useState } from 'react'

const App = () => {
	const [language, setLanguage] = useState('English' as Language)
	const [mode, setMode] = useState('Resistor' as Mode)
	const [numberOfBands, setNumberOfBands] = useState(4 as NumberOfBands)
	const [component, setComponent] = useState({
		digit1: 'Red',
		digit2: 'Black',
		digit3: 'Black',
		multiplier: 'Red',
		tolerance: 'Gold',
		temperatureCoefficient: 'Yellow',
	} as Component)

	const setModeWrapper = (m: Mode) => {
		if (m == mode) return

		setMode(m)

		switch (m) {
			case 'Resistor': {
				let tolerance: ResistorTolerance = 'Brown'
				switch (component.tolerance) {
					case 'Black':
						tolerance = 'Brown'
						break
					case 'Orange':
					case 'Yellow':
						tolerance = 'Red'
						break
					case 'White':
					case 'Grey':
						tolerance = 'Violet'
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
					temperatureCoefficient: 'Yellow',
				}

				setComponent(resistor)
				break
			}
			case 'Inductor': {
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
					case 'Grey':
					case 'White':
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
				break
			}
			case 'Capacitor': {
				if (numberOfBands == 6) {
					setNumberOfBands(5)
				}

				let tolerance: CapacitorTolerance = 'Black'
				switch (component.tolerance) {
					case 'Blue':
					case 'Violet':
					case 'Grey':
						tolerance = 'Green'
						break
					default:
						tolerance = component.tolerance
				}

				if (numberOfBands <= 4) {
					tolerance = 'Black'
				}

				let multiplier: CapacitorMultiplier = 'Black'
				switch (component.multiplier) {
					case 'Violet':
						multiplier = 'Blue'
						break
					default:
						multiplier = component.multiplier
				}

				const capacitor: Capacitor = {
					type: 'J',
					digit1: component.digit1,
					digit2: component.digit2,
					multiplier: multiplier,
					tolerance: tolerance,
					temperatureCoefficient: 'Red',
					voltageRating: 'Black',
				}

				setComponent(capacitor)
				break
			}
		}
	}

	const setCapacitorType = (capacitorType: CapacitorType) => {
		if (mode != 'Capacitor') return

		const capacitor: Capacitor = component as Capacitor
		const newVoltageRating = capacitorType == 'L' ? 'Brown' : 'Black'
		setComponent({ ...capacitor, type: capacitorType, voltageRating: newVoltageRating })
	}

	return (
		<>
			<LanguageSelector language={language} setLanguage={setLanguage} />
			<h1>{translate(language, 'title')}</h1>
			<ModeSelector mode={mode} setMode={setModeWrapper} language={language} />
			<NumberOfBandsSelector mode={mode} numberOfBands={numberOfBands} setNumberOfBands={setNumberOfBands} />
			{mode == 'Resistor' ? (
				<>
					<ResistorPicture resistor={component as Resistor} numberOfBands={numberOfBands} />
					<ResistorValue resistor={component as Resistor} numberOfBands={numberOfBands} />
					<ResistorTable
						language={language}
						resistor={component as Resistor}
						numberOfBands={numberOfBands}
						setResistor={setComponent as React.Dispatch<React.SetStateAction<Resistor>>}
					/>
				</>
			) : mode == 'Inductor' ? (
				<>
					<InductorPicture inductor={component as Inductor} numberOfBands={numberOfBands} />
					<InductorValue inductor={component as Inductor} />
					<InductorTable language={language} inductor={component as Inductor} setInductor={setComponent as React.Dispatch<React.SetStateAction<Inductor>>} />
				</>
			) : (
				<>
					<CapacitorTypeSelector capacitorType={(component as Capacitor).type} setCapacitorType={setCapacitorType} numberOfBands={numberOfBands} />
					<CapacitorPicture capacitor={component as Capacitor} numberOfBands={numberOfBands} />
					<CapacitorValue capacitor={component as Capacitor} numberOfBands={numberOfBands} />
					<CapacitorTable
						language={language}
						capacitor={component as Capacitor}
						numberOfBands={numberOfBands}
						setCapacitor={setComponent as React.Dispatch<React.SetStateAction<Capacitor>>}
					/>
				</>
			)}
		</>
	)
}

export default App
