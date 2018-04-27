export interface Item {
	getName: () => string;
	equals: (other: Item) => boolean;
}

export function buildItem(itemName: string): Item {
	const name = itemName;

	const equals = (other: Item): boolean => {
		return name === other.getName();
	};

	const getName = (): string => {
		return name;
	};

	return {
		equals,
		getName,
	};
}
