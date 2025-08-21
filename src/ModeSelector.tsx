import { Language, translate } from './lang'
import { Mode } from './types'

type ModeSelectorProps = {
	mode: Mode
	setMode: (m: Mode) => void
	language: Language
}

const ModeSelector = ({ setMode, mode, language }: ModeSelectorProps) => {
	const set = (m: Mode) => () => {
		if (m !== mode) {
			setMode(m)
		}
	}

	const selected = (m: Mode): string => {
		return m == mode ? 'option selectedOption' : 'option'
	}

	return (
		<div id="modeSelector">
			<div onClick={set('Resistor')} className={selected('Resistor')}>
				{translate(language, 'resistor')}
			</div>
			<div onClick={set('Inductor')} className={selected('Inductor')}>
				{translate(language, 'inductor')}
			</div>
			<div onClick={set('Capacitor')} className={selected('Capacitor')}>
				{translate(language, 'capacitor')}
			</div>
		</div>
	)
}

export { ModeSelector }
