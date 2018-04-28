import {expect} from 'chai'
import {compareArrays} from '../helpers/compare-arrays'
import {buildItem} from '../model/item/item'
import {buildItemQuantity} from '../model/itemQuantity/item-quantity'
import {Recipe} from '../model/recipe/recipe'
import {buildTimeSpan, TimeFrame} from '../model/timespan/timespan'
import {readFromJson} from './recipe-json-loader'
import json from './recipe-json-loader-test.json'

describe('Function RecipeJsonLoader', () => {
	const gear = buildItem('gear')
	const iron = buildItem('iron')
	const ironQuantity = buildItemQuantity(iron, 2)
	const gearQuantity = buildItemQuantity(gear, 1)
	const halfASecond = buildTimeSpan(0.5, TimeFrame.SECONDS)
	const gearsRecipe = new Recipe([ironQuantity], [gearQuantity], halfASecond)

	it('should create a recipe book from a json', () => {
		// When
		const recipes = readFromJson(json)

		// Then
		const comparison = compareArrays(recipes, [gearsRecipe])
		expect(comparison).to.be.true
	})
})
