import {expect} from 'chai'
import {buildItemFlow} from './item-flow'

describe('ItemFlow', () => {
	describe('equals', () => {
		const oneSecond: any = {
			getSeconds : () => 1,
		}
		const itemQuantity: any = {
			divide: () => itemQuantity,
			equals: (other: any) => other === itemQuantity,
			getId: () => 'itemQuantity',
		}
		const otherItemQuantity: any = {
			divide: () => otherItemQuantity,
			equals: (other: any) => other === itemQuantity,
			getId: () => 'otherItemQuantity',
		}

		it('should be the same when quantities are the same', () => {
			// Given
			const itemFlow = buildItemFlow(itemQuantity, oneSecond)

			// When
			const expected = itemFlow.equals(buildItemFlow(itemQuantity, oneSecond))

			// Then
			expect(expected).to.be.true
		})

		it('should not be the same when quantities are not the same', () => {
			// Given
			const itemFlow = buildItemFlow(itemQuantity, oneSecond)

			// When
			const expected = itemFlow.equals(buildItemFlow(otherItemQuantity, oneSecond))

			// Then
			expect(expected).to.be.false
		})
	})
})
