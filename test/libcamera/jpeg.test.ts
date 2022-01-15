import libcamera from '../../src/index'

describe('libcamera.jpeg', () => {
  it('should return the command used for taking a basic jpeg photo', async () => {
    expect(await libcamera.jpeg({ output: 'test.jpg' })).toEqual(
      'libcamera-jpeg --output test.jpg'
    )
  })

  it('should return the command used for taking a jpeg photo after 2s with a specified width and height', async () => {
    expect(
      await libcamera.jpeg({
        output: 'test.jpg',
        timeout: 2000,
        width: 640,
        height: 480,
        nopreview: true,
      })
    ).toEqual(
      'libcamera-jpeg --output test.jpg --timeout 2000 --width 640 --height 480 --nopreview'
    )
  })
})
