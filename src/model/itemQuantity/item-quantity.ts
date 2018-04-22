import {Item} from '../item/item';
import {FlowableQuantity, ItemFlow} from '../itemFlow/item-flow';
import {TimeSpan} from '../timespan/timespan';

export class ItemQuantity implements FlowableQuantity {
	private readonly item: Item;
	private readonly quantity: number;

	constructor(item: Item, quantity: number) {
		this.item = item;
		this.quantity = quantity;
	}

	public over(timeSpan: TimeSpan): ItemFlow {
		return new ItemFlow(this, timeSpan);
	}

	public getItem(): Item {
		return this.item;
	}

	public equals(other: ItemQuantity): boolean {
		return this.item.equals(other.item)
			&& this.quantity === other.quantity;
	}
	public divide(factor: number): ItemQuantity {
		if (factor === 0) {
			throw new Error('Invalid division factor');
		}
		return new ItemQuantity(this.item, this.quantity / factor);
	}
}
