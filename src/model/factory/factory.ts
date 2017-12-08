import {FactoryType} from '../factoryType/factory-type';
import {ItemFlow} from '../itemFlow/item-flow';
import {Recipe} from '../recipe/recipe';

export class Factory {
	private recipe: Recipe;
	private factoryType: FactoryType;
	private outputNeeded: ItemFlow[];

	constructor(factoryType: FactoryType, outputNeeded: ItemFlow[]) {
		this.factoryType = factoryType;
		this.outputNeeded = outputNeeded;
		this.recipe = factoryType.findRecipeForProducing(outputNeeded[0].getItem());
	}

	public getIdealInput(): ItemFlow[] {
		return this.recipe.getInput()
			.map((itemFlow) => itemFlow.multiplyFlow(this.factoryType.getCraftingSpeed()));
	}

	public getIdealOutput(): ItemFlow[] {
		return this.recipe.getOutput()
			.map((itemFlow) => itemFlow.multiplyFlow(this.factoryType.getCraftingSpeed()));
	}

	public getFactoryEfficiency(): number {
		if (this.outputNeeded.length === 0) {
			return 0;
		}
		const efficiencies = this.outputNeeded.map((outputFlow) => {
			const matchingRecipeOutputFlow = this.getIdealOutput()
				.find((itemFlow) => itemFlow.getItem() === outputFlow.getItem());
			return outputFlow.getQuantity() / matchingRecipeOutputFlow.getQuantity();
		});
		return Math.max(...efficiencies);
	}

	public computeNumberOfFactories(): number {
		return Math.ceil(this.getFactoryEfficiency());
	}

	public getRealOutput(): ItemFlow[] {
		return this.getIdealOutput()
			.map((itemFlow) => itemFlow.multiplyFlow(this.getFactoryEfficiency()));
	}

	public getRealInput(): ItemFlow[] {
		return this.getIdealInput()
			.map((itemFlow) => itemFlow.multiplyFlow(this.getFactoryEfficiency()));
	}
}

