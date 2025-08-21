import {
	CapacitorMultiplier,
	CapacitorTemperatureCoefficient,
	CapacitorTolerance,
	CapacitorType,
	CapacitorVoltageRating,
	Digit,
	InductorMultiplier,
	InductorTolerance,
	ResistorMultiplier,
	ResistorTolerance,
	TemperatureCoefficient,
} from './types'

const digitValues: ([Digit, number] | null)[] = [
	['Black', 0],
	['Brown', 1],
	['Red', 2],
	['Orange', 3],
	['Yellow', 4],
	['Green', 5],
	['Blue', 6],
	['Violet', 7],
	['Grey', 8],
	['White', 9],
]

const multiplierValues: ([ResistorMultiplier, number] | null)[] = [
	['Black', 0],
	['Brown', 1],
	['Red', 2],
	['Orange', 3],
	['Yellow', 4],
	['Green', 5],
	['Blue', 6],
	['Violet', 7],
	['Grey', 8],
	['White', 9],
	['Gold', -1],
	['Silver', -2],
]

const toleranceValues: ([ResistorTolerance, number] | null)[] = [
	null,
	['Brown', 1],
	['Red', 2],
	null,
	null,
	['Green', 0.5],
	['Blue', 0.25],
	['Violet', 0.1],
	null,
	null,
	['Gold', 5],
	['Silver', 10],
]

const temperatureCoefficientValues: ([TemperatureCoefficient, number] | null)[] = [
	['Black', 250],
	['Brown', 100],
	['Red', 50],
	['Orange', 15],
	['Yellow', 25],
	['Green', 20],
	['Blue', 10],
	['Violet', 5],
	['Grey', 1],
	null,
	null,
	null,
]

const inductorMultiplierValues: ([InductorMultiplier, number] | null)[] = [
	['Black', 0],
	['Brown', 1],
	['Red', 2],
	['Orange', 3],
	['Yellow', 4],
	['Green', 5],
	['Blue', 6],
	null,
	null,
	null,
	['Gold', -1],
	['Silver', -2],
]

const inductorToleranceValues: ([InductorTolerance, number] | null)[] = [
	['Black', 20],
	['Brown', 1],
	['Red', 2],
	['Orange', 3],
	['Yellow', 4],
	null,
	null,
	null,
	null,
	null,
	['Gold', 5],
	['Silver', 10],
]

const capacitorMultiplierValues: ([CapacitorMultiplier, number] | null)[] = [
	['Black', 0],
	['Brown', 1],
	['Red', 2],
	['Orange', 3],
	['Yellow', 4],
	['Green', 5],
	['Blue', 6],
	null,
	['Grey', -2],
	['White', -1],
	['Gold', -1],
	['Silver', -2],
]

const capacitorToleranceValues: ([CapacitorTolerance, number] | null)[] = [
	['Black', 20],
	['Brown', 1],
	['Red', 2],
	['Orange', 3],
	['Yellow', 4],
	['Green', 5],
	null,
	null,
	null,
	['White', 10],
	['Gold', 5],
	['Silver', 10],
]

const capacitorSmallToleranceValues: ([CapacitorTolerance, number] | null)[] = [
	['Black', 2],
	['Brown', 0.1],
	['Red', 0.25],
	null,
	null,
	['Green', 0.5],
	null,
	null,
	null,
	['White', 1],
	null,
	null,
]

const capacitorTemperatureCoefficientValues: ([CapacitorTemperatureCoefficient, number] | null)[] = [
	null,
	['Brown', -33],
	['Red', -75],
	['Orange', -150],
	['Yellow', -220],
	['Green', -330],
	['Blue', -470],
	['Violet', -750],
	null,
	null,
	null,
	null,
]

const capacitorVoltageRatingJValues: ([CapacitorVoltageRating, number] | null)[] = [
	['Black', 4],
	['Brown', 6],
	['Red', 10],
	['Orange', 15],
	['Yellow', 20],
	['Green', 25],
	['Blue', 35],
	['Violet', 50],
	null,
	['White', 3],
	null,
	null,
]

const capacitorVoltageRatingKValues: ([CapacitorVoltageRating, number] | null)[] = [
	['Black', 100],
	['Brown', 200],
	['Red', 300],
	['Orange', 400],
	['Yellow', 500],
	['Green', 600],
	['Blue', 700],
	['Violet', 800],
	['Grey', 900],
	['White', 1000],
	['Gold', 2000],
	null,
]

const capacitorVoltageRatingLValues: ([CapacitorVoltageRating, number] | null)[] = [
	null,
	['Brown', 100],
	['Red', 250],
	null,
	['Yellow', 400],
	null,
	['Blue', 630],
	null,
	null,
	null,
	null,
	null,
]

const capacitorVoltageRatingMValues: ([CapacitorVoltageRating, number] | null)[] = [
	['Black', 10],
	['Brown', 1.6],
	['Red', 4],
	['Orange', 40],
	['Yellow', 6.3],
	['Green', 16],
	null,
	null,
	['Grey', 25],
	['White', 2.5],
	null,
	null,
]

const capacitorVoltageRatingNValues: ([CapacitorVoltageRating, number] | null)[] = [
	['Black', 10],
	null,
	['Red', 35],
	null,
	['Yellow', 6],
	['Green', 15],
	['Blue', 20],
	null,
	['Grey', 25],
	['White', 3],
	null,
	null,
]

const getVoltageRatingsValues = (type: CapacitorType): ([CapacitorVoltageRating, number] | null)[] => {
	let voltageRatings: ([CapacitorVoltageRating, number] | null)[] = []

	switch (type) {
		case 'J':
			voltageRatings = capacitorVoltageRatingJValues
			break
		case 'K':
			voltageRatings = capacitorVoltageRatingKValues
			break
		case 'L':
			voltageRatings = capacitorVoltageRatingLValues
			break
		case 'M':
			voltageRatings = capacitorVoltageRatingMValues
			break
		case 'N':
			voltageRatings = capacitorVoltageRatingNValues
			break
	}

	return voltageRatings
}

const getCapacitorToleranceValues = (capacitance: number): ([CapacitorTolerance, number] | null)[] => {
	if (capacitance < 10) {
		return capacitorSmallToleranceValues
	}

	return capacitorToleranceValues
}

export {
	digitValues,
	multiplierValues,
	inductorMultiplierValues,
	temperatureCoefficientValues,
	toleranceValues,
	inductorToleranceValues,
	capacitorMultiplierValues,
	capacitorToleranceValues,
	capacitorSmallToleranceValues,
	capacitorTemperatureCoefficientValues,
	capacitorVoltageRatingJValues,
	capacitorVoltageRatingKValues,
	capacitorVoltageRatingLValues,
	capacitorVoltageRatingMValues,
	capacitorVoltageRatingNValues,
	getVoltageRatingsValues,
	getCapacitorToleranceValues,
}
