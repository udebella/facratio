import {expect} from 'chai'
import {ItemFlow} from './item-flow'

describe('Class ItemFlow', () => {
	describe('Method: Equals', () => {
		const oneSecond: any = {
			getSeconds : () => 1,
		}

		it('should be the same when quantities are the same', () => {
			const flowableQuantity: any = {
				divide() {return this },
				equals() {return true },
			}
			const itemFlow = new ItemFlow(flowableQuantity, oneSecond)
			const expected = itemFlow.equals(new ItemFlow(flowableQuantity, oneSecond))

			expect(expected).to.be.true
		})

		it('should not be the same when quantities are not the same', () => {
			const flowableQuantity: any = {
				divide() {return this },
				equals() {return false },
			}
			const itemFlow = new ItemFlow(flowableQuantity, oneSecond)

			const expected = itemFlow.equals(new ItemFlow(flowableQuantity, oneSecond))
			expect(expected).to.be.false
		})
	})
})
