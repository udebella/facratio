import {expect} from 'chai'
import {buildItem} from '../item/item'
import {buildItemQuantity} from '../itemQuantity/item-quantity'
import {buildTimeSpan, TimeFrame} from '../timespan/timespan'
import {ItemFlow} from './item-flow'

describe('ItemFlow features', () => {
	const copper = buildItem('Copper')
	const oneCopper = buildItemQuantity(copper, 1)
	const twoCopper = buildItemQuantity(copper, 2)
	const oneSecond = buildTimeSpan(1, TimeFrame.SECONDS)
	const twoSecond = buildTimeSpan(2, TimeFrame.SECONDS)

	it('should compare two itemflow with different TimeSpan', () => {
		const itemFlow = new ItemFlow(oneCopper, oneSecond)

		const expected = itemFlow.equals(new ItemFlow(twoCopper, twoSecond))
		expect(expected).to.be.true
	})
})
