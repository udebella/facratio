import {ItemFlow} from '../itemFlow/item-flow'

export interface Factory {
	computeMaximumOutput(): ItemFlow[]
}

export const buildFactory = () => {
	const computeMaximumOutput = () => {
		return []
	}

	return {
		computeMaximumOutput,
	}
}
