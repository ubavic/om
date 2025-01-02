import { Mode, NumberOfBands } from './types'

type BandsSelectorProps = {
	mode: Mode
	numberOfBands: NumberOfBands
	setNumberOfBands: React.Dispatch<React.SetStateAction<NumberOfBands>>
}

const NumberOfBandsSelector = ({ mode, numberOfBands, setNumberOfBands }: BandsSelectorProps) => {
	const set = (n: NumberOfBands) => () => {
		if (n !== numberOfBands) {
			setNumberOfBands(n)
		}
	}

	const selected = (n: NumberOfBands): string => {
		return n == numberOfBands ? 'option selectedOption' : 'option'
	}

	return (
		<div id="bandsSelector">
			{mode == 'Resistor' && (
				<div onClick={set(3)} className={selected(3)}>
					3
				</div>
			)}
			<div onClick={set(4)} className={selected(4)}>
				4
			</div>
			<div onClick={set(5)} className={selected(5)}>
				5
			</div>
			{mode == 'Resistor' && (
				<div onClick={set(6)} className={selected(6)}>
					6
				</div>
			)}
		</div>
	)
}

export { NumberOfBandsSelector }
