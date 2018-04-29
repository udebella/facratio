import {expect} from 'chai'
import {compareArrays} from '../../helpers/compare-arrays'
import {buildItem} from '../item/item'
import {buildItemFlow} from '../itemFlow/item-flow'
import {buildItemQuantity} from '../itemQuantity/item-quantity'
import {buildTimeSpan, TimeFrame} from '../timespan/timespan'
import {buildRecipe, Recipe} from './recipe'

describe('Recipe features', () => {
	let recipe: Recipe

	beforeEach(() => {
		const iron = buildItem('iron')
		const gear = buildItem('gear')
		const output = buildItemQuantity(gear, 1)
		const input = buildItemQuantity(iron, 2)
		const craftingTime = buildTimeSpan(0.5, TimeFrame.SECONDS)
		recipe = buildRecipe([input], [output], craftingTime)
	})

	it('should calculate right consumption', () => {
		// Given
		const iron = buildItem('iron')
		const consputionPerSecond = buildItemQuantity(iron, 4)
		const oneSecond = buildTimeSpan(1, TimeFrame.SECONDS)

		// When
		const consumption = recipe.consumes()

		// Then
		const expectedConsumption = [buildItemFlow(consputionPerSecond, oneSecond)]
		expect(compareArrays(consumption, expectedConsumption)).to.be.true
	})

	it('should calculate right production', () => {
		// Given
		const gear = buildItem('gear')
		const productionPerSecond = buildItemQuantity(gear, 2)
		const oneSecond = buildTimeSpan(1, TimeFrame.SECONDS)

		// When
		const production = recipe.produces()

		// Then
		const expectedProduction = [buildItemFlow(productionPerSecond, oneSecond)]
		expect(compareArrays(production, expectedProduction)).to.be.true
	})

	it('should be able to verify that the recipe produces gears', () => {
		// Given
		const gear = buildItem('gear')

		// When
		const producedItems = recipe.getProducedItems()

		// Then
		const expectedProducedItems = [gear]
		expect(compareArrays(producedItems, expectedProducedItems)).to.be.true
	})
})
