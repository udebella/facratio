import {expect} from 'chai'
import {compareArrays} from '../../helpers/compare-arrays'
import {buildRecipe} from './recipe'

describe('Recipe', () => {
	const timespan: any = {
		getId: () => 'timespan',
	}
	const input: any = {
		getId: () => 'input',
		over: () => 'fakeInput',
	}
	const output: any = {
		getId: () => 'output',
		getItem: () => 'someItem',
		over: () => 'fakeOutput',
	}

	describe('consumes', () => {
		it('should require no item for a free recipe', () => {
			const recipe = buildRecipe([], [], timespan)

			const comparison = compareArrays(recipe.consumes(), [])
			expect(comparison).to.be.true
		})

		it('should consume an itemflow corresponding to the recipe', () => {
			const recipe = buildRecipe([input], [], timespan)

			const comparison = compareArrays(recipe.consumes(), ['fakeInput'])
			expect(comparison).to.be.true
		})
	})

	describe('produces', () => {
		it('should not output for a recipe witch is only consuming', () => {
			const recipe = buildRecipe([], [], timespan)

			const comparison = compareArrays(recipe.produces(), [])
			expect(comparison).to.be.true
		})

		it('should produce an itemflow corresponding to the recipe', () => {
			const recipe = buildRecipe([], [output], timespan)

			const comparison = compareArrays(recipe.produces(), ['fakeOutput'])
			expect(comparison).to.be.true
		})
	})

	describe('getProducedItems', () => {
		it('should return an empty list when the recipe only consumes', () => {
			const recipe = buildRecipe([], [], timespan)

			const comparison = compareArrays(recipe.getProducedItems(), [])
			expect(comparison).to.be.true
		})

		it('should return the list of items produced', () => {
			const recipe = buildRecipe([], [output], timespan)

			const comparison = compareArrays(recipe.getProducedItems(), ['someItem'])
			expect(comparison).to.be.true
		})
	})

	describe('Comparison', () => {
		it('should be different recipe when crafting time is different', () => {
			const recipe = buildRecipe([], [output], timespan)

			const craftingTime: any = {
				getId: () => 'craftingTime',
			}
			const expected = buildRecipe([], [output], craftingTime)
			expect(recipe.equals(expected)).to.be.false
		})

		it('should be different recipe when output are not the same', () => {
			const recipe = buildRecipe([], [output], timespan)

			const expected = buildRecipe([], [input], timespan)
			expect(recipe.equals(expected)).to.be.false
		})

		it('should be different recipe when input are not the same', () => {
			const recipe = buildRecipe([input], [], timespan)

			const expected = buildRecipe([], [], timespan)
			expect(recipe.equals(expected)).to.be.false
		})
	})
})
