type Color = 'Black' | 'Brown' | 'Red' | 'Orange' | 'Yellow' | 'Green' | 'Blue' | 'Violet' | 'Grey' | 'White' | 'Gold' | 'Silver'

type Without_<T, U extends Color> = T extends U ? never : T

type Without<U extends Color> = Without_<Color, U>

type NumberOfBands = 3 | 4 | 5 | 6

type Digit = Without<'Gold' | 'Silver'>

type Multiplier = Color

type Tolerance = Without<'White'>

type TemperatureCoefficient = Without<'White' | 'Gold' | 'Silver'>

type Resistor = {
	digit1: Digit
	digit2: Digit
	digit3: Digit
	multiplier: Multiplier
	tolerance: Tolerance
	tc: TemperatureCoefficient
}

export type { Resistor, NumberOfBands, Color, Digit, Tolerance, TemperatureCoefficient, Multiplier }
