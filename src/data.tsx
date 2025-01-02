import { Digit, InductorMultiplier, InductorTolerance, ResistorMultiplier, ResistorTolerance, TemperatureCoefficient } from './types'

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

export { digitValues, multiplierValues, inductorMultiplierValues, temperatureCoefficientValues, toleranceValues, inductorToleranceValues }
