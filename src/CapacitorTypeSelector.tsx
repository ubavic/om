import { CapacitorType, NumberOfBands } from './types'

type CapacitorTypeSelectorProps = {
	capacitorType: CapacitorType
	setCapacitorType: (l: CapacitorType) => void
	numberOfBands: NumberOfBands
}

const CapacitorTypeSelector = ({ setCapacitorType, capacitorType, numberOfBands }: CapacitorTypeSelectorProps) => {
	const set = (t: CapacitorType) => () => {
		if (t !== capacitorType) {
			setCapacitorType(t)
		}
	}

	const selected = (t: CapacitorType): string => {
		return t == capacitorType ? 'option selectedOption' : 'option'
	}

	if (numberOfBands == 3) {
		return <></>
	}

	return (
		<div id="capacitorTypeSelector">
			<div onClick={set('J')} className={selected('J')} title="Tantalum">
				J
			</div>
			<div onClick={set('K')} className={selected('K')} title="Mica">
				K
			</div>
			<div onClick={set('L')} className={selected('L')} title="Polyester/Polystyrene">
				L
			</div>
			{numberOfBands == 4 ? (
				<div onClick={set('M')} className={selected('M')} title="Electrolytic">
					M
				</div>
			) : (
				<></>
			)}
		</div>
	)
}

export { CapacitorTypeSelector }
