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

	const uHenryValue = digits * 10 ** getValue(capacitor.multiplier, capacitorMultiplierValues)
	const [value, prefix] = getPrefix(uHenryValue / 1000000000000)

	const [leftEnd, rightEnd] = getInterval(uHenryValue, tolerance)

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

const getValue = <T,>(value: T, values: ([T, number] | null)[]): number => {
	for (const v of values) {
		if (v !== null && v[0] === value) {
			return v[1]
		}
	}

	return 0
}

const getPrefix = (value: number): [number, string] => {
	let prefix = ''

	if (value < 1) {
		if (value < 0.000_000_001) {
			value *= 1_000_000_000_000
			prefix = 'p'
		} else if (value < 0.000_001) {
			value *= 1_000_000_000
			prefix = 'n'
		} else if (value < 0.001) {
			value *= 1_000_000
			prefix = 'μ'
		} else {
			value *= 1000
			prefix = 'm'
		}
	} else if (value >= 1000) {
		if (value < 1_000_000) {
			value /= 1_000
			prefix = 'k'
		} else if (value < 1_000_000_000) {
			value /= 1_000_000
			prefix = 'M'
		} else {
			value /= 1_000_000_000
			prefix = 'G'
		}
	}

	value = parseFloat(value.toFixed(2))

	return [value, prefix]
}

const getInterval = (value: number, tolerance: number): [string, string] => {
	let fractionDigits = 0
	if (value < 1) {
		fractionDigits = 4
	} else if (value < 10) {
		fractionDigits = 2
	}

	let leftEnd = (1 - tolerance / 100) * value
	leftEnd = parseFloat(leftEnd.toFixed(fractionDigits))

	let rightEnd = (1 + tolerance / 100) * value
	rightEnd = parseFloat(rightEnd.toFixed(fractionDigits))

	return [leftEnd.toLocaleString('en-US'), rightEnd.toLocaleString('en-US')]
}

export { ResistorValue, InductorValue, CapacitorValue }
