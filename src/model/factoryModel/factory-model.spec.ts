import {expect} from 'chai'
import {Comparable} from '../../helpers/comparable'
import {compareArrays} from '../../helpers/compare-arrays'
import {buildFactoryModel} from './factory-model'

describe('FactoryModel', () => {
	const gear: any = {
		equals: (other: any) => other === gear,
	}
	const gearsRecipe: any = {
		getId: () => 'recipe',
		getProducedItems: () => [gear],
	}

	describe('canProduce', () => {
		it('should check if there is a recipe that can produce some items', () => {
			// Given
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
			const factoryType = buildFactoryModel([gearsRecipe], 1)

			// When
			const listProducibleItems = factoryType.listProducibleItems()

			// Then
			const comparison = compareArrays(listProducibleItems, [gear])
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

	describe('equals', () => {
		it('should recognize two factories with the same recipes', () => {
			// Given
			const factoryModel = buildFactoryModel([], 1)

			// When
			const isEqual = factoryModel.equals(buildFactoryModel([], 1))

			// Then
			expect(isEqual).to.be.true
		})

		it('should recognize when two factories does not have the same recipes', () => {
			// Given
			const factoryModel = buildFactoryModel([gearsRecipe], 1)

			// When
			const isEqual = factoryModel.equals(buildFactoryModel([], 1))

			// Then
			expect(isEqual).to.be.false
		})

		it('should recognize whe two factories does not have the same crafting speed', () => {
			// Given
			const factoryModel = buildFactoryModel([], 1)

			// When
			const isEqual = factoryModel.equals(buildFactoryModel([], 2))

			// Then
			expect(isEqual).to.be.false
		})
	})
})
