import {expect} from 'chai'
import {buildItemQuantity} from './item-quantity'

describe('ItemQuantity', () => {
	const iron: any = {
		getId: () => 'iron',
	}
	const copper: any = {
		getId: () => 'copper',
	}

	describe('getItem', () => {
		it('should give access to the item object', () => {
			const itemQuantity = buildItemQuantity(iron, 1)
			expect(itemQuantity.getItem()).to.equals(iron)
		})
	})

	describe('equals', () => {
		it('should recognize comparable quantities', () => {
			const itemQuantity = buildItemQuantity(iron, 2)

			const expected = buildItemQuantity(iron, 2)
			expect(itemQuantity.equals(expected)).to.be.true
		})

		it('should not be equal if we compare quantities of different items', () => {
			const itemQuantity = buildItemQuantity(iron, 2)

			const expected = buildItemQuantity(copper, 2)
			expect(itemQuantity.equals(expected)).to.be.false
		})

		it('should not be equal if we compare different quantities the same iron', () => {
			const itemQuantity = buildItemQuantity(iron, 2)

			const expected = buildItemQuantity({...iron}, 1)
			expect(itemQuantity.equals(expected)).to.be.false
		})
	})

	describe('divide', () => {
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
