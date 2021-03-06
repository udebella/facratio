import {buildComparable, Comparable} from '../../helpers/comparable'

export enum TimeFrame {
	SECONDS = 1,
	MINUTS = 60,
	HOURS = 3600,
}

export interface TimeSpan extends Comparable {
	getSeconds(): number
}

export const buildTimeSpan = (nbUnits: number, timeframe: TimeFrame): TimeSpan => {
	const secondsNumber = nbUnits * timeframe

	const getSeconds = () => {
		return secondsNumber
	}

	return {
		...buildComparable(`Timespan_${secondsNumber}`),
		getSeconds,
	}
}
