import {expect} from 'chai';
import {Item} from '../model/item/item';
import {readFromJson} from './recipe-json-loader';
import json from './recipe-json-loader-test.json';

describe('Function RecipeJsonLoader', () => {
	const gear = new Item('gear');

	it('should create a recipe book from a json', () => {
		const recipes = readFromJson(json);

		// TODO that test is not 100% accurate anymore : it does not check recipes created from the factory
		const [items] = recipes.map((recipe) => recipe.getProducedItems());
		expect(items).to.deep.equal([gear]);
	});
});
