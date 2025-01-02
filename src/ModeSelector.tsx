import { Mode } from './types'

type ModeSelectorProps = {
	mode: Mode
	setMode: (m: Mode) => void
}

const ModeSelector = ({ setMode, mode }: ModeSelectorProps) => {
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
				Resistor
			</div>
			<div onClick={set('Inductor')} className={selected('Inductor')}>
				Inductor
			</div>
		</div>
	)
}

export { ModeSelector }
