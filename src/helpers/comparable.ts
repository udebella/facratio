export interface Comparable {
	getId: () => string,
	equals: (other: Comparable) => boolean
}

export const buildComparable = (identifiant: string): Comparable => {
	const getId = () => identifiant
	const equals = (other: Comparable) => identifiant === other.getId()

	return {
		equals,
		getId,
	}
}
