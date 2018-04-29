import {expect} from 'chai'
import {buildItem} from '../item/item'
import {buildFactoryModel, ProducingRecipe} from './factory-model'

describe('FactoryModel', () => {
	const gear = buildItem('Gear')

	describe('canProduce', () => {
		const gearsRecipe: ProducingRecipe = {
			getProducedItems: () => [gear],
		}
		const copperWireRecipe: ProducingRecipe = {
			getProducedItems: () => [],
		}

		it('should check if there is a recipe that can produce some items', () => {
			const factoryType = buildFactoryModel([copperWireRecipe, gearsRecipe], 1)
			expect(factoryType.canProduce(gear)).to.be.true
		})

		it('should return false if no recipe can produce an item', () => {
			const factoryType = buildFactoryModel([], 1)
			expect(factoryType.canProduce(gear)).to.be.false
		})
	})

	describe('listProducibleItems', () => {
		it('should list all items the factory can produce', () => {
			const gearsRecipe: ProducingRecipe = {
				getProducedItems: () => [gear],
			}
			const factoryType = buildFactoryModel([gearsRecipe], 1)
			expect(factoryType.listProducibleItems()).to.deep.equals([gear])
		})

		it('should produce no items for a factory model without recipes', () => {
			const factoryType = buildFactoryModel([], 1)
			expect(factoryType.listProducibleItems()).to.deep.equals([])
		})
	})
})
