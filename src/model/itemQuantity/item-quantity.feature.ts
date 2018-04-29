import {expect} from 'chai'
import {buildItem} from '../item/item'
import {ItemFlow} from '../itemFlow/item-flow'
import {buildTimeSpan, TimeFrame} from '../timespan/timespan'
import {buildItemQuantity} from './item-quantity'

describe('ItemQuantity Features', () => {
	describe('over', () => {
		it('should produce an iron flow when a timespan is 1 second', () => {
			const itemQuantity = buildItemQuantity(buildItem('Iron'), 1)

			const itemFlow = itemQuantity.over(buildTimeSpan(1, TimeFrame.SECONDS))

			const expectedFlow = new ItemFlow(buildItemQuantity(buildItem('Iron'), 1), buildTimeSpan(1, TimeFrame.SECONDS))
			expect(itemFlow.equals(expectedFlow)).to.be.true
		})
	})

	describe('equals', () => {
		it('should recognize the same item quantity', () => {
			const itemQuantity = buildItemQuantity(buildItem('iron'), 1)

			const expected = buildItemQuantity(buildItem('iron'), 1)
			expect(itemQuantity.equals(expected)).to.be.true
		})

		it('should recognize the different item quantity', () => {
			const itemQuantity = buildItemQuantity(buildItem('iron'), 1)

			const expected = buildItemQuantity(buildItem('copper'), 1)
			expect(itemQuantity.equals(expected)).to.be.false
		})
	})
})
