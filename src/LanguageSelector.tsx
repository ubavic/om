import { Language } from './lang'

type LanguageSelector = {
	language: Language
	setLanguage: (l: Language) => void
}

const LanguageSelector = ({ setLanguage, language }: LanguageSelector) => {
	const set = (l: Language) => () => {
		if (l !== language) {
			setLanguage(l)
		}
	}

	const selected = (l: Language): string => {
		return l == language ? 'option selectedOption' : 'option'
	}

	return (
		<div id="languageSelector">
			<div onClick={set('English')} className={selected('English')}>
				EN
			</div>
			<div onClick={set('Serbian')} className={selected('Serbian')}>
				SR
			</div>
		</div>
	)
}

export { LanguageSelector }
