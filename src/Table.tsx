import { Digit, Multiplier, NumberOfBands, Resistor, TemperatureCoefficient, Tolerance } from './types'
import { digitValues, multiplierValues, temperatureCoefficientValues, toleranceValues } from './data'

type TableProps = {
	numberOfBands: NumberOfBands
	setResistor: React.Dispatch<React.SetStateAction<Resistor>>
	resistor: Resistor
}

const Table = ({ setResistor, numberOfBands, resistor }: TableProps) => {
	const setDigit1 = (c: Digit) => () => {
		setResistor({ ...resistor, digit1: c })
	}

	const setDigit2 = (c: Digit) => () => {
		setResistor({ ...resistor, digit2: c })
	}

	const setDigit3 = (c: Digit) => () => {
		setResistor({ ...resistor, digit3: c })
	}

	const setMultiplier = (c: Multiplier) => () => {
		setResistor({ ...resistor, multiplier: c })
	}

	const setTolerance = (c: Tolerance) => () => {
		setResistor({ ...resistor, tolerance: c })
	}

	const setTemperatureCoefficient = (c: TemperatureCoefficient) => () => {
		setResistor({ ...resistor, tc: c })
	}

	return (
		<div className="columns">
			<ValuesColumn values={digitValues} callback={setDigit1} selected={resistor.digit1} />
			<ValuesColumn values={digitValues} callback={setDigit2} selected={resistor.digit2} />
			{numberOfBands >= 5 ? <ValuesColumn values={digitValues} callback={setDigit3} selected={resistor.digit3} /> : <></>}
			<ValuesColumn values={multiplierValues} superscript callback={setMultiplier} selected={resistor.multiplier} />
			{numberOfBands >= 4 ? <ValuesColumn values={toleranceValues} callback={setTolerance} selected={resistor.tolerance} /> : <></>}
			{numberOfBands == 6 ? <ValuesColumn values={temperatureCoefficientValues} callback={setTemperatureCoefficient} selected={resistor.tc} /> : <></>}
		</div>
	)
}

type ValuesColumnProps<T> = {
	values: ([T, number] | null)[]
	superscript?: boolean
	callback: (c: T) => () => void
	selected: T
}

const ValuesColumn = <T extends string>({ values, superscript, callback, selected }: ValuesColumnProps<T>) => {
	return (
		<div className="valuesColumn">
			{values.map((v, i) =>
				v !== null ? (
					<div className={v[0] + ' valueCell ' + (selected === v[0] ? 'selected' : '')} key={i} onClick={callback(v[0])}>
						<span>
							{superscript ? (
								<>
									10<sup>{`${v[1]}`}</sup>
								</>
							) : (
								`${v[1]}`
							)}
						</span>
					</div>
				) : (
					<div key={i} className="empty valueCell">
						&nbsp;
					</div>
				),
			)}
		</div>
	)
}

export { Table }
