import LibCamera from './LibCamera'
import { run, cmd, convertOptionsToCmdArgs } from './utils'

async function runLibCamera(
  bin: string = 'libcamera-still',
  options: Partial<LibCamera.OptionsObject>
) {
  const args = convertOptionsToCmdArgs(options)
  const command = cmd(bin, args)
  if (process.env.NODE_ENV === 'test') {
    console.log(command)
    return command
  }
  return run(command)
}

/**
 * Wrapper function for the [`libcamera-jpeg` command](https://www.raspberrypi.com/documentation/accessories/camera.html#libcamera-jpeg)
 *
 * @param options The options object sent to `libcamera-jpeg` as command-line flags
 */
export function jpeg(options: Partial<LibCamera.StillOptionsObject>) {
  return runLibCamera('libcamera-jpeg', options)
}

/**
 * Wrapper function for the [`libcamera-still` command](https://www.raspberrypi.com/documentation/accessories/camera.html#libcamera-still)
 *
 * @param options The options object sent to `libcamera-still` as command-line flags
 */
export function still(options: Partial<LibCamera.StillOptionsObject>) {
  return runLibCamera('libcamera-still', options)
}

/**
 * Wrapper function for the [`libcamera-vid` command](https://www.raspberrypi.com/documentation/accessories/camera.html#libcamera-vid)
 *
 * @param options The options object sent to `libcamera-vid` as command-line flags
 */
export function vid(options: Partial<LibCamera.VideoOptionsObject>) {
  return runLibCamera('libcamera-vid', options)
}

/**
 * Wrapper function for the [`libcamera-raw` command](https://www.raspberrypi.com/documentation/accessories/camera.html#libcamera-raw)
 *
 * @param options The options object sent to `libcamera-raw` as command-line flags
 */
export function raw(options: Partial<LibCamera.VideoOptionsObject>) {
  return runLibCamera('libcamera-raw', options)
}

export const libcamera = { jpeg, still, vid, raw }
export default libcamera
