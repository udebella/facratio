export interface FlowableQuantity {
	divide(factor: number): FlowableQuantity;
	equals(flowableQuantity: FlowableQuantity): boolean;
}

export interface FlowTimespan {
	getSeconds(): number;
}

export class ItemFlow {
	private flowableQuantity: FlowableQuantity;

	constructor(flowableQuantity: FlowableQuantity, timespan: FlowTimespan) {
		this.flowableQuantity = flowableQuantity.divide(timespan.getSeconds());
	}

	public equals(other: ItemFlow): boolean {
		return this.flowableQuantity.equals(other.flowableQuantity);
	}
}
