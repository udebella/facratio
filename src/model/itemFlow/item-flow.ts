import {ItemQuantity} from '../itemQuantity/item-quantity';
import {TimeSpan} from '../timespan/timespan';

export class ItemFlow {
	private itemQuantity: ItemQuantity;

	constructor(itemQuantity: ItemQuantity, timespan: TimeSpan) {
		this.itemQuantity = itemQuantity.multiply(timespan.getSeconds());
	}

	public equals(other: ItemFlow): boolean {
		return this.itemQuantity.equals(other.itemQuantity);
	}
}
