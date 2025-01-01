import { NumberOfBands, Resistor } from './types'
import { digitValues, multiplierValues, temperatureCoefficientValues, toleranceValues } from './data'

type ValueProps = {
	resistor: Resistor
	numberOfBands: NumberOfBands
}

const Value = ({ resistor, numberOfBands }: ValueProps) => {
	let digits = 10 * getValue(resistor.digit1, digitValues) + getValue(resistor.digit2, digitValues)

	if (numberOfBands >= 5) {
		digits = 10 * digits + getValue(resistor.digit3, digitValues)
	}

	const tolerance = numberOfBands == 3 ? 20 : getValue(resistor.tolerance, toleranceValues)

	let value = digits * 10 ** getValue(resistor.multiplier, multiplierValues)
	let prefix: string = ''
	const tc = numberOfBands == 6 ? <>{getValue(resistor.tc, temperatureCoefficientValues)}ppm/°C</> : ''

	if (value >= 1000) {
		if (value < 1000000) {
			value /= 1000
			prefix = 'k'
		} else if (value < 1000000000) {
			value /= 1000000
			prefix = 'M'
		} else {
			value /= 1000000000
			prefix = 'G'
		}
	}

	const nw = { whiteSpace: 'nowrap' }

	value = parseFloat(value.toFixed(2))

	return (
		<div id="value">
			<span style={nw}>
				{value}
				{prefix}Ω
			</span>{' '}
			<span style={nw}>± {tolerance}%</span> <span style={nw}>{tc}</span>
		</div>
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

export { Value }
