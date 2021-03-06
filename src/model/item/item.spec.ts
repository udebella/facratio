import {expect} from 'chai'
import {buildItem} from './item'

describe('Item', () => {
	describe('equals', () => {
		it('different items should not be equals', () => {
			const iron = buildItem('iron')
			const copper = buildItem('copper')

			expect(iron.equals(copper)).to.be.false
		})

		it('same items should be equals', () => {
			const iron = buildItem('iron')

			expect(iron.equals(buildItem('iron'))).to.be.true
		})
	})
})
