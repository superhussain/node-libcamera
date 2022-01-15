import libcamera from '../../src/index'

describe('libcamera.vid', () => {
  it('should return the command used for taking a 10s video', async () => {
    expect(
      await libcamera.vid({
        output: 'test.h264',
        timeout: 10000,
        'save-pts': 'timestamps.txt',
      })
    ).toEqual(
      'libcamera-vid --output test.h264 --timeout 10000 --save-pts timestamps.txt'
    )
  })
})
