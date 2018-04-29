import {buildComparable, Comparable} from '../../helpers/comparable'
import {buildFactoryModel} from '../factoryModel/factory-model'
import {Item} from '../item/item'

export interface Producer {
	canProduce(item: Item): boolean
}

export const NOTHING_PRODUCER: Producer = buildFactoryModel([], 1)

export interface FactoryModels extends Comparable {
	findModelProducing(item: Item): Producer
}

export const buildFactoryModels = (producers: Producer[]): FactoryModels => {
	const findModelProducing = (item: Item): Producer => {
		return producers.find((producer) => producer.canProduce(item))
			|| NOTHING_PRODUCER
	}

	return {
		// FIXME factory models are not comparable while factory does not implement comparable
		...buildComparable(''),
		findModelProducing,
	}
}
