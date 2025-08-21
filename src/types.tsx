type Mode = 'Resistor' | 'Inductor' | 'Capacitor'

type Color = 'Black' | 'Brown' | 'Red' | 'Orange' | 'Yellow' | 'Green' | 'Blue' | 'Violet' | 'Grey' | 'White' | 'Gold' | 'Silver'

type Without<U extends Color> = Exclude<Color, U>

type NumberOfBands = 3 | 4 | 5 | 6

type Digit = Without<'Gold' | 'Silver'>

type ResistorMultiplier = Color

type ResistorTolerance = Without<'Black' | 'Orange' | 'Yellow' | 'Grey' | 'White'>

type TemperatureCoefficient = Without<'White' | 'Gold' | 'Silver'>

type InductorMultiplier = Without<'Violet' | 'Grey' | 'White'>

type InductorTolerance = Without<'Green' | 'Blue' | 'Violet' | 'Grey' | 'White'>

type CapacitorMultiplier = Without<'Violet'>

type CapacitorTolerance = Without<'Blue' | 'Violet'>

type CapacitorVoltageRating = Without<'Silver'>

type CapacitorTemperatureCoefficient = Without<'Black' | 'Grey' | 'White' | 'Gold' | 'Silver'>

type Resistor = {
	digit1: Digit
	digit2: Digit
	digit3: Digit
	multiplier: ResistorMultiplier
	tolerance: ResistorTolerance
	tc: TemperatureCoefficient
}

type Inductor = {
	digit1: Digit
	digit2: Digit
	multiplier: InductorMultiplier
	tolerance: InductorTolerance
}

type CapacitorType = 'J' | 'K' | 'L' | 'M' | 'N'

type Capacitor = {
	type: CapacitorType
	digit1: Digit
	digit2: Digit
	multiplier: CapacitorMultiplier
	tolerance: CapacitorTolerance
	temperatureCoefficient: CapacitorTemperatureCoefficient
	voltageRating: CapacitorVoltageRating
}

export type {
	Mode,
	Resistor,
	Inductor,
	NumberOfBands,
	Color,
	Digit,
	ResistorTolerance,
	TemperatureCoefficient,
	ResistorMultiplier,
	InductorMultiplier,
	InductorTolerance,
	CapacitorType,
	Capacitor,
	CapacitorMultiplier,
	CapacitorTolerance,
	CapacitorVoltageRating,
	CapacitorTemperatureCoefficient,
}
