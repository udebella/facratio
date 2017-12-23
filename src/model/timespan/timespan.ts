export enum TimeFrame {
	SECONDS = 1,
	MINUTS = 60,
	HOURS = 3600
}

export class TimeSpan {
	private secondsNumber: number;

	constructor(nbUnits: number, timeframe: TimeFrame) {
		this.secondsNumber = nbUnits * timeframe;
	}

	public getSeconds(): number {
		return this.secondsNumber;
	}
}