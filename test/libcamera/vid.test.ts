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

  it('should return the command used for running a network stream', async () => {
    expect(
      await libcamera.vid({
        timeout: 0,
        inline: true,
        listen: true,
        output: 'tcp://0.0.0.0:1234',
      })
    ).toEqual(
      'libcamera-vid --timeout 0 --inline --listen --output tcp://0.0.0.0:1234'
    )
  })
})
