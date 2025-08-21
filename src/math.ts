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

const getValue = <T>(value: T, values: ([T, number] | null)[]): number => {
	for (const v of values) {
		if (v !== null && v[0] === value) {
			return v[1]
		}
	}

	return 0
}

export { getValue, getPrefix, getInterval }
