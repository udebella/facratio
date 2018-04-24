import {expect} from 'chai';
import {compareArrays} from '../../helpers/compare-arrays';
import {buildItem} from '../item/item';
import {ItemFlow} from '../itemFlow/item-flow';
import {ItemQuantity} from '../itemQuantity/item-quantity';
import {buildTimeSpan, TimeFrame} from '../timespan/timespan';
import {Recipe} from './recipe';

describe('Recipe features', () => {
	let recipe: Recipe;

	beforeEach(() => {
		const iron = buildItem('iron');
		const gear = buildItem('gear');
		const output = new ItemQuantity(gear, 1);
		const input = new ItemQuantity(iron, 2);
		const craftingTime = buildTimeSpan(0.5, TimeFrame.SECONDS);
		recipe = new Recipe([input], [output], craftingTime);
	});

	it('should calculate right consumption', () => {
		// Given
		const iron = buildItem('iron');
		const consputionPerSecond = new ItemQuantity(iron, 4);
		const oneSecond = buildTimeSpan(1, TimeFrame.SECONDS);

		// When
		const consumption = recipe.consumes();

		// Then
		const expectedConsumption = [new ItemFlow(consputionPerSecond, oneSecond)];
		expect(compareArrays(consumption, expectedConsumption)).to.be.true;
	});

	it('should calculate right production', () => {
		// Given
		const gear = buildItem('gear');
		const productionPerSecond = new ItemQuantity(gear, 2);
		const oneSecond = buildTimeSpan(1, TimeFrame.SECONDS);

		// When
		const production = recipe.produces();

		// Then
		const expectedProduction = [new ItemFlow(productionPerSecond, oneSecond)];
		expect(compareArrays(production, expectedProduction)).to.be.true;
	});

	it('should be able to verify that the recipe produces gears', () => {
		// Given
		const gear = buildItem('gear');

		// When
		const producedItems = recipe.getProducedItems();

		// Then
		const expectedProducedItems = [gear];
		expect(compareArrays(producedItems, expectedProducedItems)).to.be.true;
	});
});
