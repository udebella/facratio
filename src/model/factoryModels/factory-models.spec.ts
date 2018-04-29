import {expect} from 'chai'
import {buildFactoryModels, FactoryModels, NOTHING_PRODUCER, Producer} from './factory-models'

describe('FactoryModels', () => {
	describe('findModelForProducing', () => {
		it('should find the right model that can produce an gear', () => {
			// Given
			const gearProducer: Producer = {
				canProduce: () => true,
			}
			const factoryModels: FactoryModels = buildFactoryModels([gearProducer])

			// When
			const foundModel = factoryModels.findModelProducing({} as any)

			// Then
			expect(foundModel).to.equals(gearProducer)
		})

		it('should find the right model that can produce an copper wire', () => {
			// Given
			const notProducer: Producer = {
				canProduce: () => false,
			}
			const producer: Producer = {
				canProduce: () => true,
			}
			const factoryModels: FactoryModels = buildFactoryModels([notProducer, producer])

			// When
			const foundModel = factoryModels.findModelProducing({} as any)

			// Then
			expect(foundModel).to.equals(producer)
		})

		it('should return a default value when no matching factory is found', () => {
			// Givenn
			const factoryModels: FactoryModels = buildFactoryModels([])

			// When
			const foundModel = factoryModels.findModelProducing({} as any)

			// Then
			expect(foundModel).to.equals(NOTHING_PRODUCER)
		})
	})
})
