import {expect} from 'chai';
import {buildItem} from '../item/item';
import {FactoryModels, NOTHING_PRODUCER, Producer} from './factory-models';

describe('Class FactoryModels', () => {
	const copperWire = buildItem('copperWire');
	const gear = buildItem('gear');
	const gearProducer: Producer = {
		canProduce: (item) => item.equals(gear)
	};
	const copperWireProducer: Producer = {
		canProduce: (item) => item.equals(copperWire)
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
			const foundModel = factoryModels.findModelProducing(buildItem('iron'));

			expect(foundModel).to.equals(NOTHING_PRODUCER);
		});
	});
});
