import {expect} from 'chai'
import {compareArrays} from '../../helpers/compare-arrays'
import {buildRecipe} from './recipe'

describe('Recipe', () => {
	const timespan: any = {
		getSeconds: () => 1,
	}
	const input: any = {
		over: () => fakeInput,
	}
	const output: any = {
		getItem: () => item,
		over: () => fakeOutput,
	}
	const fakeInput: any = 'fakeInput'
	const fakeOutput: any = 'fakeOutput'
	const item: any = 'someItem'

	describe('Method: consumes', () => {
		it('should require no item for a free recipe', () => {
			const recipe = buildRecipe([], [], timespan)
			expect(recipe.consumes()).to.deep.equal([])
		})

		it('should consume an itemflow corresponding to the recipe', () => {
			const recipe = buildRecipe([input], [], timespan)

			expect(recipe.consumes()).to.deep.equal([fakeInput])
		})
	})

	describe('Method: produces', () => {
		it('should not output for a recipe witch is only consuming', () => {
			const recipe = buildRecipe([], [], timespan)
			expect(recipe.produces()).to.deep.equal([])
		})

		it('should produce an itemflow corresponding to the recipe', () => {
			const recipe = buildRecipe([], [output], timespan)

			expect(recipe.produces()).to.deep.equal([fakeOutput])
		})
	})

	describe('Method: getProducedItems', () => {
		it('should return an empty list when the recipe only consumes', () => {
			const recipe = buildRecipe([], [], timespan)

			const comparison = compareArrays(recipe.getProducedItems(), [])
			expect(comparison).to.be.true
		})

		it('should return the list of items produced', () => {
			const recipe = buildRecipe([], [output], timespan)

			const comparison = compareArrays(recipe.getProducedItems(), [item])
			expect(comparison).to.be.true
		})
	})
})
