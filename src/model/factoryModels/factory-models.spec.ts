import {expect} from 'chai';
import {Item} from "../item/item";
import {FactoryModels, NOTHING_PRODUCER, Producer} from "./factory-models";

describe('Class FactoryModels', () => {
	const copperWire = new Item('copperWire');
	const gear = new Item('gear');
	const gearProducer: Producer = {
		canProduce(item) {return item === gear; }
	};
	const copperWireProducer: Producer = {
		canProduce(item) {return item === copperWire; }
	};
	const factoryModels: FactoryModels = new FactoryModels([gearProducer, copperWireProducer]);

	describe('Method findModelForProducing', () => {
		it('should find the right model that can produce an gear', () => {
			const foundModel = factoryModels.findModelProducing(gear);

			expect(foundModel).to.equals(gearProducer);
		});

		it('should find the right model that can produce an copper wire', () => {
			const foundModel = factoryModels.findModelProducing(copperWire);

			expect(foundModel).to.equals(copperWireProducer);
		});

		it('should return a default value when no matching factory is found', () => {
			const foundModel = factoryModels.findModelProducing(new Item('iron'));

			expect(foundModel).to.equals(NOTHING_PRODUCER);
		});
	});
});
