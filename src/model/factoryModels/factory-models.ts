import {buildComparable, Comparable} from '../../helpers/comparable'
import {buildFactoryModel, FactoryModel} from '../factoryModel/factory-model'
import {Item} from '../item/item'

export const NOTHING_PRODUCER: FactoryModel = buildFactoryModel([], 1)

export interface FactoryModels extends Comparable {
	findModelProducing(item: Item): FactoryModel
}

export const buildFactoryModels = (producers: FactoryModel[]): FactoryModels => {
	const findModelProducing = (item: Item): FactoryModel => {
		return producers.find((producer) => producer.canProduce(item))
			|| NOTHING_PRODUCER
	}

	const producersIds = producers.map((producer: any) => producer.getId())

	return {
		...buildComparable(`factoryModels_${producersIds}`),
		findModelProducing,
	}
}
