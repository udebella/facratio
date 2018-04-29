import {expect} from 'chai'
import {buildFactoryModels, FactoryModels, NOTHING_PRODUCER} from './factory-models'

describe('FactoryModels', () => {
	const gear: any = 'gear'
	const gearProducer: any = {
		canProduce: (item: any) => item === gear,
		getId: () => 'bidule',
	}
	describe('findModelForProducing', () => {
		it('should find the model when the only producer produces the requested item', () => {
			// Given
			const factoryModels: FactoryModels = buildFactoryModels([gearProducer])

			// When
			const foundModel = factoryModels.findModelProducing(gear)

			// Then
			expect(foundModel).to.equals(gearProducer)
		})

		it('should find the right model when there is multiple producers', () => {
			// Given
			const notProducer: any = {
				canProduce: () => false,
				getId: () => 'machin',
			}
			const factoryModels: FactoryModels = buildFactoryModels([notProducer, gearProducer])

			// When
			const foundModel = factoryModels.findModelProducing(gear)

			// Then
			expect(foundModel).to.equals(gearProducer)
		})

		it('should return a default value when no matching factory is found', () => {
			// Given
			const factoryModels: FactoryModels = buildFactoryModels([])

			// When
			const foundModel = factoryModels.findModelProducing(gear)

			// Then
			expect(foundModel).to.equals(NOTHING_PRODUCER)
		})
	})

	describe('equals', () => {
		it('should recognize two identical factory models', () => {
			// Given
			const factoryModels = buildFactoryModels([])

			// When
			const isEqual = factoryModels.equals(buildFactoryModels([]))

			// Then
			expect(isEqual).to.be.true
		})

		it('should recognize when two factory models does contain the same models', () => {
			// Given
			const factoryModels = buildFactoryModels([gearProducer])

			// When
			const isEqual = factoryModels.equals(buildFactoryModels([]))

			// Then
			expect(isEqual).to.be.false
		})
	})
})
