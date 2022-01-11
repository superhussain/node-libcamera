import { convertOptionsToCmdArgs } from '../src/utils'

describe('utils', () => {
  it('convertOptionsToCmdArgs', () => {
    expect(convertOptionsToCmdArgs({ output: 'test.jpg' })).toEqual([
      '--output',
      'test.jpg',
    ])
  })
})
