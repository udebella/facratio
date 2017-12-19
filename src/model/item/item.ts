export class Item {
	private name: string;

	constructor(name: string) {
		this.name = name;
	}

	public equals(other: Item): boolean {
		return this.name === other.name;
	}
}
