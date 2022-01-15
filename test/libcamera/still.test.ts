import libcamera from '../../src/index'

describe('libcamera.still', () => {
  it('should return the command used for taking a basic photo', async () => {
    expect(await libcamera.still({ output: 'test.jpg' })).toEqual(
      'libcamera-still --output test.jpg'
    )
  })

  it('should return the command used for taking a photo after 2s with a specified width and height', async () => {
    expect(
      await libcamera.still({
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
})
