import {expect} from 'chai'
import {buildComparable} from './comparable'

describe('Comparable', () => {
	describe('getId', () => {
		it('should return the id of the comparable', () => {
			const comparable = buildComparable('identifiant')

			expect(comparable.getId()).to.equals('identifiant')
		})
	})

	describe('equals', () => {
		it('should allow to compare two comparable', () => {
			const comparable = buildComparable('identifiant')

			const expected = buildComparable('identifiant')
			expect(comparable.equals(expected)).to.be.true
		})

		it('should allow to compare two comparable', () => {
			const comparable = buildComparable('identifiant')

			const expected = buildComparable('identifiant2')
			expect(comparable.equals(expected)).to.be.false
		})
	})
})
