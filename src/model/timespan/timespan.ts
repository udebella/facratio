import {FlowTimespan} from "../itemFlow/item-flow";

export enum TimeFrame {
	SECONDS = 1,
	MINUTS = 60,
	HOURS = 3600
}

export class TimeSpan implements FlowTimespan {
	private secondsNumber: number;

	constructor(nbUnits: number, timeframe: TimeFrame) {
		this.secondsNumber = nbUnits * timeframe;
	}

	public getSeconds(): number {
		return this.secondsNumber;
	}
}
