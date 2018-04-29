import {expect} from 'chai'
import {compareArrays} from '../../helpers/compare-arrays'
import {buildItem} from '../item/item'
import {buildItemQuantity} from '../itemQuantity/item-quantity'
import {buildRecipe} from '../recipe/recipe'
import {buildTimeSpan, TimeFrame} from '../timespan/timespan'
import {buildFactoryModel} from './factory-model'

describe('FactoryModel features', () => {
	const iron = buildItem('iron')
	const gear = buildItem('gear')
	const input = buildItemQuantity(iron, 2)
	const output = buildItemQuantity(gear, 1)
	const craftingTime = buildTimeSpan(0.5, TimeFrame.SECONDS)
	const gearsRecipe = buildRecipe([input], [output], craftingTime)
	const factoryType = buildFactoryModel([gearsRecipe], 1)

	describe('canProduce', () => {
		it('should be able to produce an item that is listed in output', () => {
			// When
			const canProduce = factoryType.canProduce(buildItem('gear'))

			// Then
			expect(canProduce).to.be.true
		})
	})

	describe('listProducibleItems', () => {
		it('should list all items the factory can produce', () => {
			// When
			const listProducibleItems = factoryType.listProducibleItems()

			// Then
			const comparison = compareArrays(listProducibleItems, [buildItem('gear')])
			expect(comparison).to.be.true
		})
	})
})
