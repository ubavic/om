import { Capacitor, CapacitorType, Color, Component, Inductor, Mode, NumberOfBands, Resistor } from './types'
import {
	capacitorMultiplierValues,
	capacitorTemperatureCoefficientValues,
	digitValues,
	getVoltageRatingsValues,
	inductorMultiplierValues,
	inductorToleranceValues,
	multiplierValues,
	temperatureCoefficientValues,
	toleranceValues,
} from './data'
import { useEffect, useState } from 'react'
import { Language } from './lang'

const useParam = <T extends number | string>(key: string, parseValue: (param: string | null) => T): [T, React.Dispatch<React.SetStateAction<T>>] => {
	const getParam = (): T => {
		const params = new URLSearchParams(window.location.search)
		return parseValue(params.get(key))
	}

	const [value, setValue] = useState(getParam)

	useEffect(() => {
		const url = new URL(window.location.href)
		url.searchParams.set(key, `${value}`)
		window.history.replaceState({}, '', url)
	}, [value, key])

	useEffect(() => {
		const onPopState = () => {
			setValue(getParam())
		}
		window.addEventListener('popstate', onPopState)
		return () => {
			window.removeEventListener('popstate', onPopState)
		}
	}, [])

	return [value, setValue] as const
}

const parseComponent = (mode: Mode): Component => {
	const params = new URLSearchParams(window.location.search)

	const getBand = (key: string): Color | null => {
		const value = params.get(key)

		if (value == null) return null
		if (['Black', 'Brown', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Violet', 'Grey', 'White', 'Gold', 'Silver'].includes(value)) {
			return value as Color
		}

		return null
	}

	const assertType = <T extends Color>(value: Color | null, values: ([T, number] | null)[], defaultValue: T): T => {
		if (value === null) return defaultValue

		const found = values.filter(v => v !== null).filter(v => v[0] == value).length
		if (found > 0) {
			return value as T
		}

		return defaultValue
	}

	const digit1 = getBand('d1')
	const digit2 = getBand('d2')
	const digit3 = getBand('d3')
	const multiplier = getBand('mul')
	const tolerance = getBand('tol')
	const temperatureCoefficient = getBand('tc')
	const voltageRating = getBand('v')

	switch (mode) {
		case 'Resistor': {
			const r: Resistor = {
				digit1: assertType(digit1, digitValues, 'Red'),
				digit2: assertType(digit2, digitValues, 'Black'),
				digit3: assertType(digit3, digitValues, 'Black'),
				multiplier: assertType(multiplier, multiplierValues, 'Red'),
				tolerance: assertType(tolerance, toleranceValues, 'Gold'),
				temperatureCoefficient: assertType(temperatureCoefficient, temperatureCoefficientValues, 'Yellow'),
			}
			return r
		}
		case 'Inductor': {
			const i: Inductor = {
				digit1: assertType(digit1, digitValues, 'Red'),
				digit2: assertType(digit2, digitValues, 'Black'),
				multiplier: assertType(multiplier, inductorMultiplierValues, 'Red'),
				tolerance: assertType(tolerance, inductorToleranceValues, 'Gold'),
			}
			return i
		}
		case 'Capacitor': {
			const capTypeParam = params.get('cap_type') ?? 'J'
			const capType = ['J', 'K', 'L', 'M'].includes(capTypeParam) ? (capTypeParam as CapacitorType) : 'J'

			const c: Capacitor = {
				digit1: assertType(digit1, digitValues, 'Red'),
				digit2: assertType(digit2, digitValues, 'Black'),
				multiplier: assertType(tolerance, capacitorMultiplierValues, 'Gold'),
				temperatureCoefficient: assertType(temperatureCoefficient, capacitorTemperatureCoefficientValues, 'Red'),
				tolerance: assertType(tolerance, inductorToleranceValues, 'Gold'),
				voltageRating: assertType(voltageRating, getVoltageRatingsValues(capType), 'Gold'),
				type: capType,
			}
			return c
		}
	}
}

const setComponentUrlParams = (component: Component) => {
	const url = new URL(window.location.href)

	if ('digit1' in component) url.searchParams.set('d1', component['digit1' as keyof typeof component])
	if ('digit2' in component) url.searchParams.set('d2', component['digit2' as keyof typeof component])
	if ('digit3' in component) url.searchParams.set('d3', component['digit3' as keyof typeof component])
	if ('multiplier' in component) url.searchParams.set('mul', component['multiplier' as keyof typeof component])
	if ('tolerance' in component) url.searchParams.set('tol', component['tolerance' as keyof typeof component])
	if ('temperatureCoefficient' in component) url.searchParams.set('tc', component['temperatureCoefficient' as keyof typeof component])
	if ('voltageRating' in component) url.searchParams.set('v', component['voltageRating' as keyof typeof component])

	window.history.replaceState({}, '', url)
}

const parseLanguage = (s: string | null): Language => {
	return s === 'Serbian' ? s : 'English'
}

const parseMode = (s: string | null): Mode => {
	if (s !== null) {
		if (['Resistor', 'Inductor', 'Capacitor'].includes(s)) return s as Mode
	}

	return 'Resistor'
}

const parseNumberOfBands = (s: string | null): NumberOfBands => {
	if (s !== null) {
		if ([3, 4, 5, 6].includes(parseInt(s))) return parseInt(s) as NumberOfBands
	}

	return 4
}

export { parseComponent, useParam, setComponentUrlParams, parseMode, parseLanguage, parseNumberOfBands }
