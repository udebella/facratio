import {Item} from '../item/item';
import {ItemFlow} from '../itemFlow/item-flow';
import {TimeSpan} from '../timespan/timespan';

export class ItemQuantity {
	private item: Item;
	private quantity: number;

	constructor(item: Item, quantity: number) {
		this.item = item;
		this.quantity = quantity;
	}

	public over(timeSpan: TimeSpan): ItemFlow {
		return new ItemFlow(this, timeSpan);
	}

	public equals(other: ItemQuantity): boolean {
		return this.item.equals(other.item)
			&& this.quantity === other.quantity;
	}

	public hasItem(item: Item): boolean {
		return this.item.equals(item);
	}

	public divide(factor: number): ItemQuantity {
		if (factor === 0) {
			throw new Error('Invalid division factor');
		}
		return new ItemQuantity(this.item, this.quantity / factor);
	}
}
