import {expect} from 'chai'
import {compareArrays} from '../../helpers/compare-arrays'
import {buildFactoryModel} from './factory-model'

describe('FactoryModel', () => {

	describe('canProduce', () => {
		const gear: any = {
			equals: (other: any) => other === gear,
		}

		it('should check if there is a recipe that can produce some items', () => {
			// Given
			const gearsRecipe: any = {
				getProducedItems: () => [gear],
			}
			const factoryType = buildFactoryModel([gearsRecipe], 1)

			// When
			const canProduce = factoryType.canProduce(gear)

			// Then
			expect(canProduce).to.be.true
		})

		it('should return false if no recipe can produce an item', () => {
			// Given
			const factoryType = buildFactoryModel([], 1)

			// When
			const canProduce = factoryType.canProduce(gear)

			// Then
			expect(canProduce).to.be.false
		})
	})

	describe('listProducibleItems', () => {
		it('should list all items the factory can produce', () => {
			// Given
			const gearsRecipe: any = {
				getProducedItems: () => ['gear'],
			}
			const factoryType = buildFactoryModel([gearsRecipe], 1)

			// When
			const listProducibleItems = factoryType.listProducibleItems()

			// Then
			const comparison = compareArrays(listProducibleItems, ['gear'])
			expect(comparison).to.be.true
		})

		it('should produce no items for a factory model without recipes', () => {
			// Given
			const factoryType = buildFactoryModel([], 1)

			// When
			const listProducibleItems = factoryType.listProducibleItems()

			// Then
			const comparison = compareArrays(listProducibleItems, [])
			expect(comparison).to.be.true
		})
	})
})
