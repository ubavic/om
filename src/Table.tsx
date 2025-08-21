import {
	Capacitor,
	CapacitorMultiplier,
	CapacitorTolerance,
	CapacitorVoltageRating,
	Digit,
	Inductor,
	InductorMultiplier,
	InductorTolerance,
	NumberOfBands,
	Resistor,
	ResistorMultiplier,
	ResistorTolerance,
	TemperatureCoefficient,
} from './types'
import {
	capacitorMultiplierValues,
	capacitorToleranceValues,
	digitValues,
	getVoltageRatingsValues,
	inductorMultiplierValues,
	inductorToleranceValues,
	multiplierValues,
	temperatureCoefficientValues,
	toleranceValues,
} from './data'

type ResistorTableProps = {
	numberOfBands: NumberOfBands
	setResistor: React.Dispatch<React.SetStateAction<Resistor>>
	resistor: Resistor
}

const ResistorTable = ({ setResistor, numberOfBands, resistor }: ResistorTableProps) => {
	const setDigit1 = (c: Digit) => () => {
		setResistor({ ...resistor, digit1: c })
	}

	const setDigit2 = (c: Digit) => () => {
		setResistor({ ...resistor, digit2: c })
	}

	const setDigit3 = (c: Digit) => () => {
		setResistor({ ...resistor, digit3: c })
	}

	const setMultiplier = (c: ResistorMultiplier) => () => {
		setResistor({ ...resistor, multiplier: c })
	}

	const setTolerance = (c: ResistorTolerance) => () => {
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
			<ValuesColumn values={multiplierValues} superscript callback={setMultiplier} selected={resistor.multiplier} columnClassName="multiplierColumn" />
			{numberOfBands >= 4 ? <ValuesColumn values={toleranceValues} callback={setTolerance} selected={resistor.tolerance} /> : <></>}
			{numberOfBands == 6 ? <ValuesColumn values={temperatureCoefficientValues} callback={setTemperatureCoefficient} selected={resistor.tc} /> : <></>}
		</div>
	)
}

type InductorTableProps = {
	setInductor: React.Dispatch<React.SetStateAction<Inductor>>
	inductor: Inductor
}

const InductorTable = ({ setInductor, inductor }: InductorTableProps) => {
	const setDigit1 = (c: Digit) => () => {
		setInductor({ ...inductor, digit1: c })
	}

	const setDigit2 = (c: Digit) => () => {
		setInductor({ ...inductor, digit2: c })
	}

	const setMultiplier = (c: InductorMultiplier) => () => {
		setInductor({ ...inductor, multiplier: c })
	}

	const setTolerance = (c: InductorTolerance) => () => {
		setInductor({ ...inductor, tolerance: c })
	}

	return (
		<div className="columns">
			<ValuesColumn values={digitValues} callback={setDigit1} selected={inductor.digit1} />
			<ValuesColumn values={digitValues} callback={setDigit2} selected={inductor.digit2} />
			<ValuesColumn values={inductorMultiplierValues} superscript callback={setMultiplier} selected={inductor.multiplier} columnClassName="multiplierColumn" />
			<ValuesColumn values={inductorToleranceValues} callback={setTolerance} selected={inductor.tolerance} />
		</div>
	)
}

type CapacitorTableProps = {
	setCapacitor: React.Dispatch<React.SetStateAction<Capacitor>>
	capacitor: Capacitor
	numberOfBands: NumberOfBands
}

const CapacitorTable = ({ setCapacitor, capacitor, numberOfBands }: CapacitorTableProps) => {
	const setDigit1 = (c: Digit) => () => {
		setCapacitor({ ...capacitor, digit1: c })
	}

	const setDigit2 = (c: Digit) => () => {
		setCapacitor({ ...capacitor, digit2: c })
	}

	const setMultiplier = (c: CapacitorMultiplier) => () => {
		setCapacitor({ ...capacitor, multiplier: c })
	}

	const setTolerance = (c: CapacitorTolerance) => () => {
		setCapacitor({ ...capacitor, tolerance: c })
	}

	const setVoltageRating = (c: CapacitorVoltageRating) => () => {
		setCapacitor({ ...capacitor, voltageRating: c })
	}

	const voltageRatings = getVoltageRatingsValues(capacitor.type)

	return (
		<div className="columns">
			<ValuesColumn values={digitValues} callback={setDigit1} selected={capacitor.digit1} />
			<ValuesColumn values={digitValues} callback={setDigit2} selected={capacitor.digit2} />
			<ValuesColumn values={capacitorMultiplierValues} superscript callback={setMultiplier} selected={capacitor.multiplier} columnClassName="multiplierColumn" />
			{numberOfBands >= 5 ? <ValuesColumn values={capacitorToleranceValues} callback={setTolerance} selected={capacitor.tolerance} /> : <></>}
			{numberOfBands >= 4 ? <ValuesColumn values={voltageRatings} callback={setVoltageRating} selected={capacitor.voltageRating} /> : <></>}
		</div>
	)
}

type ValuesColumnProps<T> = {
	values: ([T, number] | null)[]
	superscript?: boolean
	callback: (c: T) => () => void
	selected: T
	columnClassName?: string
}

const ValuesColumn = <T extends string>({ values, superscript, callback, selected, columnClassName }: ValuesColumnProps<T>) => {
	return (
		<div className={'valuesColumn' + ' ' + (columnClassName ?? '')}>
			{values.map((v, i) =>
				v !== null ? (
					<div className={v[0] + ' valueCell ' + (selected === v[0] ? 'selected' : '')} key={i} onClick={callback(v[0])}>
						<TableValue value={v[1]} superscript={superscript} />
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

type TableValueProps = {
	value: number
	superscript?: boolean
}

const TableValue = ({ value, superscript }: TableValueProps) => {
	return (
		<span>
			{superscript ? (
				<>
					{value <= 1 && value >= 0 ? (
						value == 0 ? (
							'1'
						) : (
							'10'
						)
					) : (
						<>
							10<sup>{`${value}`}</sup>
						</>
					)}
				</>
			) : (
				`${value}`
			)}
		</span>
	)
}

export { InductorTable, ResistorTable, CapacitorTable }
