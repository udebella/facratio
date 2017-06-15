import {Item} from '../item/item';

export class ItemFlow {
	private item: Item;
	private quantity: number;

	constructor(item: Item, quantity: number) {
		this.item = item;
		this.quantity = quantity;
	}

	public getQuantity(): number {
		return this.quantity;
	}

	public getItem(): Item {
		return this.item;
	}

	public multiplyFlow(factor: number): ItemFlow {
		return new ItemFlow(this.item, this.quantity * factor);
	}

	public divideFlow(factor: number): ItemFlow {
		return new ItemFlow(this.item, this.quantity / factor);
	}
}
