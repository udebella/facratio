import {expect} from 'chai';
import {Item} from "../model/item/item";
import {ItemQuantity} from "../model/itemQuantity/item-quantity";
import {Recipe} from "../model/recipe/recipe";
import {TimeFrame, TimeSpan} from "../model/timespan/timespan";
import {readFromJson} from './recipe-json-loader';
import recipeBookTest from './recipe-json-loader-test.json';

describe('Function RecipeJsonLoader', () => {
	const gear = new Item('gear');
	const iron = new Item('iron');
	const ironQuantity = new ItemQuantity(iron, 2);
	const gearQuantity = new ItemQuantity(gear, 1);
	const halfASecond = new TimeSpan(0.5, TimeFrame.SECONDS);
	const gearsRecipe = new Recipe([ironQuantity], [gearQuantity], halfASecond);

	it('should create a recipe book from a json', () => {
		const recipes = readFromJson(recipeBookTest);

		expect(recipes).to.deep.equal([gearsRecipe]);
	});
});
