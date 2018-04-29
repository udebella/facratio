import {expect} from 'chai'
import {buildFactoryModel} from '../factoryModel/factory-model'
import {buildItem} from '../item/item'
import {buildItemQuantity} from '../itemQuantity/item-quantity'
import {buildRecipe} from '../recipe/recipe'
import {buildTimeSpan, TimeFrame} from '../timespan/timespan'
import {buildFactoryModels} from './factory-models'

describe('Factory models features', () => {
	describe('find producer', () => {
		it('should be able to find the right producer for a given item', () => {
			// Given
			const craftingTime = buildTimeSpan(0.5, TimeFrame.SECONDS)
			const output = buildItemQuantity(buildItem('Gear wheel'), 1)
			const input = buildItemQuantity(buildItem('Iron'), 2)
			const gearWheelRecipe = buildRecipe([input], [output], craftingTime)
			const gearWheelFactory = buildFactoryModel([gearWheelRecipe], 1)
			const factoryModels = buildFactoryModels([gearWheelFactory])

			// When
			const factory = factoryModels.findModelProducing(buildItem('Gear wheel'))

			// Then
			expect(factory).to.equals(gearWheelFactory)
		})
	})
})
