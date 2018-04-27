const hasSameLength = (first: any[], second: any[]) => first.length === second.length

const hasSameMembers = (first: any[], second: any[]) => {
	const smartComparison = (current: any, index: number) => {
		if (current.equals) {
			return current.equals(second[index])
		}
		return current === second[index]
	}

	return first
		.map(smartComparison)
		.reduce((previous: boolean, current: boolean) => {
			return previous && current
		}, true)
}

const compareArrays = (first: any[], second: any[]) => {
	return hasSameLength(first, second) && hasSameMembers(first, second)
}

export {compareArrays}
