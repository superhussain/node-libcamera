import { convertOptionsToCmdArgs } from '../../src/utils'

describe('convertOptionsToCmdArgs', () => {
  it('should return the command args from the output option', () => {
    expect(convertOptionsToCmdArgs({ output: 'test.jpg' })).toEqual([
      '--output',
      'test.jpg',
    ])
  })

  it('should return the command args from multiple common options', () => {
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

  it('should return the command args from the basic video options', () => {
    expect(
      convertOptionsToCmdArgs({
        output: 'test.h264',
        timeout: 10000,
        'save-pts': 'timestamps.txt',
      })
    ).toEqual([
      '--output',
      'test.h264',
      '--timeout',
      '10000',
      '--save-pts',
      'timestamps.txt',
    ])
  })
})
