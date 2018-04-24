import {TimeSpan} from '../timespan/timespan';

export interface FlowableQuantity {
	divide(factor: number): FlowableQuantity;
	equals(flowableQuantity: FlowableQuantity): boolean;
}

export class ItemFlow {
	private readonly flowableQuantity: FlowableQuantity;

	constructor(flowableQuantity: FlowableQuantity, timespan: TimeSpan) {
		this.flowableQuantity = flowableQuantity.divide(timespan.getSeconds());
	}

	public equals(other: ItemFlow): boolean {
		return this.flowableQuantity.equals(other.flowableQuantity);
	}
}
