import {expect} from 'chai'
import {buildItem} from '../item/item'
import {buildItemQuantity} from '../itemQuantity/item-quantity'
import {buildTimeSpan, TimeFrame} from '../timespan/timespan'
import {buildItemFlow} from './item-flow'

describe('ItemFlow features', () => {
	const copper = buildItem('Copper')
	const oneCopper = buildItemQuantity(copper, 1)
	const twoCopper = buildItemQuantity(copper, 2)
	const oneSecond = buildTimeSpan(1, TimeFrame.SECONDS)
	const twoSecond = buildTimeSpan(2, TimeFrame.SECONDS)

	it('should compare two itemflow with different TimeSpan', () => {
		const itemFlow = buildItemFlow(oneCopper, oneSecond)

		const expected = itemFlow.equals(buildItemFlow(twoCopper, twoSecond))
		expect(expected).to.be.true
	})

	it('should compare two itemflow with different TimeSpan', () => {
		const itemFlow = buildItemFlow(oneCopper, twoSecond)

		const expected = itemFlow.equals(buildItemFlow(twoCopper, twoSecond))
		expect(expected).to.be.false
	})
})
