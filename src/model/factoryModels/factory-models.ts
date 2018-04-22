import {Item} from '../item/item';

export interface Producer {
	canProduce(item: Item): boolean;
}

export const NOTHING_PRODUCER: Producer = {
	canProduce: () => false
};

export class FactoryModels {
	private readonly factoryModels: Producer[];

	constructor(factoryModels: Producer[]) {
		this.factoryModels = factoryModels;
	}

	public findModelProducing(item: Item): Producer {
		return this.factoryModels
			.find((producer) => producer.canProduce(item))
			|| NOTHING_PRODUCER;
	}
}
