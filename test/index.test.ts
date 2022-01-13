import { still, vid } from '../src/index'

describe('node-libcamera', () => {
  it('still - output', async () => {
    expect(await still({ output: 'test.jpg' })).toEqual(
      'libcamera-still --output test.jpg'
    )
  })

  it('still - multiple options', async () => {
    expect(
      await still({
        output: 'test.jpg',
        timeout: 2000,
        width: 640,
        height: 480,
        nopreview: true,
      })
    ).toEqual(
      'libcamera-still --output test.jpg --timeout 2000 --width 640 --height 480 --nopreview'
    )
  })

  it('vid', async () => {
    expect(
      await vid({
        output: 'test.h264',
        timeout: 10000,
        'save-pts': 'timestamps.txt',
      })
    ).toEqual(
      'libcamera-vid --output test.h264 --timeout 10000 --save-pts timestamps.txt'
    )
  })
})
