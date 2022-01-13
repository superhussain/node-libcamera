import { LibCamera } from './options'
import { run, cmd, convertOptionsToCmdArgs } from './utils'

function runLibCamera(
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

export function jpeg(options: Partial<LibCamera.OptionsObject>) {
  return runLibCamera('libcamera-jpeg', options)
}

export function still(options: Partial<LibCamera.OptionsObject>) {
  return runLibCamera('libcamera-still', options)
}

export function vid(options: Partial<LibCamera.OptionsObject>) {
  return runLibCamera('libcamera-vid', options)
}
