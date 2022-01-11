import { LibCamera } from './options'
import { run, cmd, convertOptionsToCmdArgs } from './utils'

export function snap(options: LibCamera.OptionsObject) {
  const args = convertOptionsToCmdArgs(options)
  const command = cmd('libcamera-still', args)
  return run(command)
}
