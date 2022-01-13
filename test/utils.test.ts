import { convertOptionsToCmdArgs } from '../src/utils'

describe('utils', () => {
  it('convertOptionsToCmdArgs - output', () => {
    expect(convertOptionsToCmdArgs({ output: 'test.jpg' })).toEqual([
      '--output',
      'test.jpg',
    ])
  })

  it('convertOptionsToCmdArgs - multiple options', () => {
    expect(
      convertOptionsToCmdArgs({
        output: 'test.jpg',
        timeout: 2000,
        width: 640,
        height: 480,
        nopreview: true,
      })
    ).toEqual([
      '--output',
      'test.jpg',
      '--timeout',
      '2000',
      '--width',
      '640',
      '--height',
      '480',
      '--nopreview',
    ])
  })
})
