type Language = 'English' | 'Serbian'

type Translation = {
	title: string
	resistor: string
	inductor: string
	capacitor: string
	digit1: string
	digit2: string
	digit3: string
	multiplier: string
	tolerance: string
	temperatureCoefficient: string
	voltage: string
}

const serbianTranslation: Translation = {
	title: 'Kalkulator oznaka',
	resistor: 'Otpornik',
	inductor: 'Induktor',
	capacitor: 'Kondenzator',
	digit1: '1. cifra',
	digit2: '2. cifra',
	digit3: '3. cifra',
	multiplier: 'množilac',
	tolerance: 'tolerancija',
	temperatureCoefficient: 'temp. koef.',
	voltage: 'maks. napon',
}

const englishTranslation: Translation = {
	title: 'Color code calculator',
	resistor: 'Resistor',
	inductor: 'Inductor',
	capacitor: 'Capacitor',
	digit1: '1st digit',
	digit2: '2nd digit',
	digit3: '3rd digit',
	multiplier: 'multiplier',
	tolerance: 'tolerance',
	temperatureCoefficient: 'temp. coef.',
	voltage: 'max voltage',
}

const translate = (language: Language, key: keyof Translation): string => {
	switch (language) {
		case 'English':
			return englishTranslation[key]
		case 'Serbian':
			return serbianTranslation[key]
	}
}

export { translate }

export type { Language }
