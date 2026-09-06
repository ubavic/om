const getPrefix = (value: number): [number, string] => {
	if (value === 0) {
		return [0, '']
	}

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

const getFractionDigits = (delta: number): number => {
	const abs = Math.abs(delta)
	if (!Number.isFinite(abs) || abs === 0) {
		return 0
	}

	return Math.min(4, Math.max(0, 1 - Math.floor(Math.log10(abs))))
}

const getInterval = (value: number, tolerance: number, absolute = false): [string, string] => {
	const leftRaw = absolute ? value - tolerance : (value * (100 - tolerance)) / 100
	const rightRaw = absolute ? value + tolerance : (value * (100 + tolerance)) / 100
	const fractionDigits = getFractionDigits((rightRaw - leftRaw) / 2)

	const leftEnd = parseFloat(leftRaw.toFixed(fractionDigits))
	const rightEnd = parseFloat(rightRaw.toFixed(fractionDigits))

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
