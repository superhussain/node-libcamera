import { exec, ExecOptionsWithBufferEncoding } from 'child_process'
import { OPTIONS, LibCamera } from './options'

export function cmd(base: string, args?: string[]): string {
  if (base && !args) return base
  return `${base} ${args?.join(' ')}`
}

export function run(command: string, options?: ExecOptionsWithBufferEncoding) {
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (stderr || error) reject(stderr || error)
      resolve(stdout)
    })
  })
}

export function convertOptionsToCmdArgs(
  options: LibCamera.OptionsObject
): string[] {
  const args: string[] = []
  Object.entries(options).forEach(([key, val]) => {
    const opt = OPTIONS[key as LibCamera.OptionKeys]
    if (typeof opt.validator === 'function' && !opt.validator(val)) {
      throw new Error(`Invalid value for option "${key}"`)
    }
    const value = typeof opt.convert === 'function' ? opt.convert(val) : val
    if (value) args.push(`--${key}`)
    if (value !== true) args.push(value)
  }, true)
  return args
}
