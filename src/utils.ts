import { exec, ExecOptionsWithBufferEncoding } from 'child_process'
import { optionConverterMap, LibCamera } from './options'

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
  options: Partial<LibCamera.OptionsObject>
): string[] {
  const args: string[] = []
  Object.entries(options).forEach(([key, val]) => {
    const converter = optionConverterMap[key as LibCamera.OptionKeys]
    const value = typeof converter === 'function' ? converter(val) : val
    if (value) args.push(`--${key}`)
    if (value !== true && value?.toString()) args.push(value?.toString())
  }, true)
  return args
}
