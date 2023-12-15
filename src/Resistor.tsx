import { Color, NumberOfBands, Resistor } from './types'

type ResistorProps = {
	resistor: Resistor
	numberOfBands: NumberOfBands
}

const ResistorPicture = ({ resistor, numberOfBands }: ResistorProps) => {
	return (
		<div id="resistorContainer">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 220">
				<defs>
					<linearGradient id="gradientGold" gradientUnits="userSpaceOnUse" x1="500" y1="250" x2="500" y2="0">
						<stop style={{ stopColor: '#9f7928', stopOpacity: 1 }} offset="0" />
						<stop style={{ stopColor: '#ffe054', stopOpacity: 1 }} offset="1" />
					</linearGradient>
					<linearGradient id="gradientSilver" gradientUnits="userSpaceOnUse" x1="500" y1="200" x2="500" y2="0">
						<stop style={{ stopColor: '#aaaaaf', stopOpacity: 1 }} offset="0" />
						<stop style={{ stopColor: '#eee', stopOpacity: 1 }} offset="1" />
					</linearGradient>
					<clipPath clipPathUnits="userSpaceOnUse" id="clipPath">
						<path
							d="m 260,10 h 20 q 20,0 40,20 h 360 q 20,-20 40,-20 h 40 c 80,0 80,30 80,100 0,70 0,100 -80,100 h -40 q -20,0 -40,-20 H 320 q -20,20 -40,20 h -40 c -80,0 -80,-30 -80,-100 0,-70 0,-100 80,-100 z"
							fill="#000"
						/>
					</clipPath>
				</defs>
				<rect fill="#888" id="rect1" width="960" height="10" x="20" y="113" rx="10" ry="10" />
				<g clipPath="url(#clipPath)">
					<rect fill="#ebcba5" width="710" height="220" x="140" y="0" />
					<Band color={resistor.digit1} x={223} />
					<Band color={resistor.digit2} x={338} />
					{numberOfBands >= 5 ? <Band color={resistor.digit3} x={411} /> : <></>}
					<Band color={resistor.multiplier} x={485} />
					{numberOfBands >= 4 ? <Band color={resistor.tolerance} x={631} /> : <></>}
					{numberOfBands == 6 ? <Band color={resistor.tc} x={747} /> : <></>}
				</g>
			</svg>
		</div>
	)
}

type BandProps = {
	color: Color
	x: number
}

const Band = ({ color, x }: BandProps) => (
	<rect
		style={{
			fill: ColorValue(color),
		}}
		width="30"
		height="220"
		x={`${x}`}
		y="0"
	/>
)

const ColorValue = (color: Color): string => {
	switch (color) {
		case 'Gold':
			return 'url(#gradientGold)'
		case 'Silver':
			return 'url(#gradientSilver)'
		default:
			return `var(--${color})`
	}
}

export { ResistorPicture }
