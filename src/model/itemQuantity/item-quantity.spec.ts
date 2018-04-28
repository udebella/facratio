import {expect} from 'chai'
import {buildItem} from '../item/item'
import {ItemFlow} from '../itemFlow/item-flow'
import {buildItemQuantity} from './item-quantity'

describe('ItemQuantity', () => {
	const iron = buildItem('Iron')

	describe('Method: over', () => {
		it('should produce an iron flow when a timespan is 1 second', () => {
			const itemQuantity = buildItemQuantity(iron, 1)
			const timeSpan: any = {
				getSeconds: () => 1,
			}

			const itemFlow = itemQuantity.over(timeSpan)

			const expectedFlow = new ItemFlow(buildItemQuantity(iron, 1), timeSpan)
			expect(itemFlow.equals(expectedFlow)).to.be.true
		})
	})

	describe('Method: getItem', () => {
		it('should give access to the item object', () => {
			const itemQuantity = buildItemQuantity(iron, 1)
			expect(itemQuantity.getItem()).to.be.equals(iron)
		})
	})

	describe('Method: equals', () => {
		it('should recognize comparable quantities', () => {
			const itemQuantity = buildItemQuantity(iron, 2)

			const expected = buildItemQuantity(iron, 2)
			expect(itemQuantity.equals(expected)).to.be.true
		})

		it('should not be equal if we compare quantities of different items', () => {
			const itemQuantity = buildItemQuantity(iron, 2)

			const expected = buildItemQuantity(buildItem('Copper'), 2)
			expect(itemQuantity.equals(expected)).to.be.false
		})

		it('should not be equal if we compare different quantities the same iron', () => {
			const itemQuantity = buildItemQuantity(iron, 2)

			const expected = buildItemQuantity(buildItem('Iron'), 1)
			expect(itemQuantity.equals(expected)).to.be.false
		})
	})

	describe('Method: divide', () => {
		it('should allow to divide an itemQuantity by two', () => {
			const itemQuantity = buildItemQuantity(iron, 2)

			const itemQuantityDivided = itemQuantity.divide(2)

			const expected = itemQuantityDivided.equals(buildItemQuantity(iron, 1))
			expect(expected).to.be.true
		})

		it('should not allow a division by 0', () => {
			const itemQuantity = buildItemQuantity(iron, 2)

			expect(() => itemQuantity.divide(0)).to.throw('Invalid division factor')
		})
	})
})
