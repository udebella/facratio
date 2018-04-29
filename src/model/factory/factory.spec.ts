import {expect} from 'chai'
import {buildFactory} from './factory'

describe('Factory', () => {

	describe('computeMaximumOutput', () => {
		it('should produce no output when the recipebook does not contain a recipe for the item', () => {
			const factory = buildFactory()
			expect(factory.computeMaximumOutput()).to.deep.equal([])
		})
	})
})
