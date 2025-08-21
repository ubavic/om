type Language = 'English' | 'Serbian'

type Translation = {
	title: string
	resistor: string
	inductor: string
}

const serbianTranslation: Translation = {
	title: 'Kalkulator oznaka',
	resistor: 'Otpornik',
	inductor: 'Induktor',
}

const englishTranslation: Translation = {
	title: 'Color code calculator',
	resistor: 'Resistor',
	inductor: 'Inductor',
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
