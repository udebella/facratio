import {expect} from 'chai'
import {buildTimeSpan, TimeFrame} from './timespan'

describe('TimeSpan', () => {
	describe('getSeconds', () => {
		it('should give second number for a given timespan of 1 second', () => {
			const timespan = buildTimeSpan(1, TimeFrame.SECONDS)

			expect(timespan.getSeconds()).to.equal(1)
		})

		it('should give second number for a given timespan of 2 second', () => {
			const timespan = buildTimeSpan(2, TimeFrame.SECONDS)

			expect(timespan.getSeconds()).to.equal(2)
		})

		it('should give second number for a given timespan of 1 minute', () => {
			const timespan = buildTimeSpan(1, TimeFrame.MINUTS)

			expect(timespan.getSeconds()).to.equal(60)
		})

		it('should give second number for a given timespan of 2 hours', () => {
			const timespan = buildTimeSpan(2, TimeFrame.HOURS)

			expect(timespan.getSeconds()).to.equal(7200)
		})
	})
})
