export class Item {
	private readonly name: string;

	constructor(name: string) {
		this.name = name;
	}

	public equals(other: Item): boolean {
		return this.name === other.name;
	}
}
