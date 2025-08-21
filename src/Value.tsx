import { Capacitor, Inductor, NumberOfBands, Resistor } from './types'
import {
	capacitorMultiplierValues,
	capacitorToleranceValues,
	digitValues,
	getVoltageRatingsValues,
	inductorMultiplierValues,
	inductorToleranceValues,
	multiplierValues,
	temperatureCoefficientValues,
	toleranceValues,
} from './data'
import { getInterval, getPrefix, getValue } from './math'

const nw = { whiteSpace: 'nowrap' }

type ResistorValueProps = {
	resistor: Resistor
	numberOfBands: NumberOfBands
}

const ResistorValue = ({ resistor, numberOfBands }: ResistorValueProps) => {
	let digits = 10 * getValue(resistor.digit1, digitValues) + getValue(resistor.digit2, digitValues)

	if (numberOfBands >= 5) {
		digits = 10 * digits + getValue(resistor.digit3, digitValues)
	}

	const tolerance = numberOfBands == 3 ? 20 : getValue(resistor.tolerance, toleranceValues)

	const ohmValue = digits * 10 ** getValue(resistor.multiplier, multiplierValues)
	const tc = numberOfBands == 6 ? <>{getValue(resistor.tc, temperatureCoefficientValues)}ppm/°C</> : ''

	const [value, prefix] = getPrefix(ohmValue)

	const [leftEnd, rightEnd] = getInterval(ohmValue, tolerance)

	return (
		<>
			<div id="value">
				<span style={nw}>
					{value}
					{prefix}Ω
				</span>{' '}
				<span style={nw}>± {tolerance}%</span> <span style={nw}>{tc}</span>
			</div>
			<div id="valueSpan">
				{leftEnd}Ω ≤ R ≤ {rightEnd}Ω
			</div>
		</>
	)
}

type InductorValueProps = {
	inductor: Inductor
}

const InductorValue = ({ inductor }: InductorValueProps) => {
	const digits = 10 * getValue(inductor.digit1, digitValues) + getValue(inductor.digit2, digitValues)
	const tolerance = getValue(inductor.tolerance, inductorToleranceValues)

	const uHenryValue = digits * 10 ** getValue(inductor.multiplier, inductorMultiplierValues)
	const [value, prefix] = getPrefix(uHenryValue / 1000000)

	const [leftEnd, rightEnd] = getInterval(uHenryValue, tolerance)

	return (
		<>
			<div id="value">
				<span style={nw}>
					{value}
					{prefix}H
				</span>{' '}
				<span style={nw}>± {tolerance}%</span>
			</div>
			<div id="valueSpan">
				{leftEnd}μH ≤ L ≤ {rightEnd}μH
			</div>
		</>
	)
}

type CapacitorValueProps = {
	capacitor: Capacitor
	numberOfBands: NumberOfBands
}

const CapacitorValue = ({ capacitor, numberOfBands }: CapacitorValueProps) => {
	const digits = 10 * getValue(capacitor.digit1, digitValues) + getValue(capacitor.digit2, digitValues)
	const tolerance = getValue(capacitor.tolerance, capacitorToleranceValues)

	const pFaradValue = digits * 10 ** getValue(capacitor.multiplier, capacitorMultiplierValues)
	const [value, prefix] = getPrefix(pFaradValue / 1000000000000)

	const [leftEnd, rightEnd] = getInterval(pFaradValue, tolerance)

	const voltageRating = getValue(capacitor.voltageRating, getVoltageRatingsValues(capacitor.type))

	return (
		<>
			<div id="value">
				<span style={nw}>
					{value}
					{prefix}F
				</span>{' '}
				<span style={nw}>± {tolerance}%</span> {numberOfBands >= 4 ? <span style={nw}>{voltageRating}V</span> : <></>}
			</div>
			<div id="valueSpan">
				{leftEnd}pF ≤ C ≤ {rightEnd}pF
			</div>
		</>
	)
}

export { ResistorValue, InductorValue, CapacitorValue }
