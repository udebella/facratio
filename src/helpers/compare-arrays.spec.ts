import {expect} from 'chai'
import {compareArrays} from './compare-arrays'

describe('function: compareArrays', () => {
	describe('array length', () => {
		it('should return false when the two arrays are not the same size', () => {
			expect(compareArrays([], [1])).to.be.false
		})

		it('should return true when the two arrays are empty', () => {
			expect(compareArrays([], [])).to.be.true
		})
	})

	describe('primitive comparison', () => {
		it('should return true when the two arrays contain the same primitives', () => {
			expect(compareArrays([1], [1])).to.be.true
		})

		it('should return false when the two arrays contain different primitives', () => {
			expect(compareArrays([1], [2])).to.be.false
		})

		it('should return false when some values are different', () => {
			expect(compareArrays([3, 2], [1, 2])).to.be.false
		})
	})

	describe('object comparison', () => {

		it('should return false when comparing arrays of objects', () => {
			expect(compareArrays([{}], [{}])).to.be.false
		})

		it('should use method equals when objects implements the function', () => {
			// Given
			const object1 = {
				equals: (other: any) => other.value === 'someValue',
				value: 'someValue',
			}
			const object2 = {value: 'someValue'}
			const object3 = {value: 'someOtherValue'}

			// When
			const firstComparison = compareArrays([object1], [object2])
			const secondComparison = compareArrays([object1], [object3])

			// Then
			expect(firstComparison).to.be.true
			expect(secondComparison).to.be.false
		})

		it('should properly handle case with multiple objects', () => {
			// Given
			const object1 = {
				equals: (other: any) => other.value === 'someValue',
				value: 'someValue',
			}
			const object2 = {value: 'someOtherValue'}

			// When
			const comparison = compareArrays([object1, object1], [object2, object1])

			// Then
			expect(comparison).to.be.false
		})
	})
})
