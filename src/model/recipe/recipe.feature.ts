import {expect} from 'chai';
import {Item} from '../item/item';
import {ItemFlow} from '../itemFlow/item-flow';
import {ItemQuantity} from '../itemQuantity/item-quantity';
import {TimeFrame, TimeSpan} from '../timespan/timespan';
import {Recipe} from './recipe';

describe('Recipe features', () => {
	let recipe: Recipe;

	beforeEach(() => {
		const iron = new Item('iron');
		const gear = new Item('gear');
		const output = new ItemQuantity(gear, 1);
		const input = new ItemQuantity(iron, 2);
		const craftingTime = new TimeSpan(0.5, TimeFrame.SECONDS);
		recipe = new Recipe([input], [output], craftingTime);
	});

	it('should calculate right consumption', () => {
		const iron = new Item('iron');
		const consputionPerSecond = new ItemQuantity(iron, 4);
		const oneSecond = new TimeSpan(1, TimeFrame.SECONDS);

		expect(recipe.consumes()).to.deep.equals([new ItemFlow(consputionPerSecond, oneSecond)]);
	});

	it('should calculate right production', () => {
		const gear = new Item('gear');
		const productionPerSecond = new ItemQuantity(gear, 2);
		const oneSecond = new TimeSpan(1, TimeFrame.SECONDS);

		expect(recipe.produces()).to.deep.equals([new ItemFlow(productionPerSecond, oneSecond)]);
	});

	it('should be able to verify that the recipe produces gears', () => {
		const gear = new Item('gear');

		expect(recipe.getProducedItems()).to.deep.equals([gear]);
	});
});
