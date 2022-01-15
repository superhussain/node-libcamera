import { exec, ExecOptionsWithBufferEncoding } from 'child_process'
import LibCamera from './LibCamera'

/**
 * Get the string command of a base command with an array of args
 * @param base The base command without any flags
 * @param args An array of args command args
 * @returns The command string
 */
export function cmd(base: string, args?: string[]): string {
  if (base && !args) return base
  return `${base} ${args?.join(' ')}`
}

/**
 * Execute a command
 * @param command The command string
 * @param options Any options to pass to the node exec function
 * @returns A promise that resolves to the stdout of the command that was run
 */
export function run(
  command: string,
  options?: ExecOptionsWithBufferEncoding
): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (stderr || error) reject(stderr || error)
      resolve(stdout?.toString()?.trim())
    })
  })
}

/**
 * Convert libcamera options to command line args
 * @param options Options for the libcamera service
 * @returns An array of command line args
 */
export function convertOptionsToCmdArgs(
  options: Partial<LibCamera.OptionsObject>
): string[] {
  const args: string[] = []
  Object.entries(options).forEach(([key, val]) => {
    const converter = optionConverterMap[key as LibCamera.OptionKeys]
    const value = typeof converter === 'function' ? converter(val) : val
    if (value) args.push(`--${key}`)
    if (value && value !== true && value?.toString()) {
      args.push(value?.toString())
    }
  }, true)
  return args
}

export const optionConverterMap: Partial<Record<
  LibCamera.OptionKeys,
  LibCamera.OptionConverter
>> = {
  preview({ x, y, width, height }: LibCamera.PreviewOption) {
    return `${x},${y},${width},${height}`
  },
  thumb({ width, height, quality }: LibCamera.ThumbOption) {
    return `${width}:${height}:${quality}`
  },
  awbgains([val1, val2]: [number, number]) {
    return `${val1},${val2}`
  },
  roi({ x, y, w, h }: LibCamera.ROIOption) {
    return `${x},${y},${w},${h}`
  },
}
