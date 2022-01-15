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

export function jpeg(options: Partial<LibCamera.StillOptionsObject>) {
  return runLibCamera('libcamera-jpeg', options)
}

export function still(options: Partial<LibCamera.StillOptionsObject>) {
  return runLibCamera('libcamera-still', options)
}

export function vid(options: Partial<LibCamera.VideoOptionsObject>) {
  return runLibCamera('libcamera-vid', options)
}

export function raw(options: Partial<LibCamera.VideoOptionsObject>) {
  return runLibCamera('libcamera-raw', options)
}

export const libcamera = { jpeg, still, vid, raw }
export default libcamera
