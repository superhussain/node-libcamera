export namespace LibCamera {
  export type OptionKeys = typeof OPTION_KEYS[number]

  export interface OptionDefinition {
    short?: string
    desc?: string
    validator?: (val: any) => boolean
    convert?: (val: any) => string
  }

  export type OptionsObject = {
    [key in OptionKeys]?: any
  }

  export interface PreviewOption {
    x: number
    y: number
    width: number
    height: number
  }
}

export const OPTION_KEYS = [
  'help',
  'version',
  'timeout',
  'preview',
  'fullscreen',
  'qt-preview',
  'nopreview',
  'info-text',
  'width',
  'height',
  'viewfinder-width',
  'viewfinder-height',
  // ...
  'output',
] as const

export const OPTIONS: Record<
  LibCamera.OptionKeys,
  LibCamera.OptionDefinition
> = {
  help: {
    short: 'h',
    desc: 'Print help information for the application',
  },
  version: {
    desc: 'Print help information for the application',
  },
  timeout: {
    short: 't',
    desc: 'Delay before application stops automatically <milliseconds>',
    validator: (val: number) => typeof val === 'number',
    convert: (val: number) => val.toString(),
  },
  preview: {
    short: 'p',
    desc: 'Preview window settings <x,y,w,h>',
    validator(val: LibCamera.PreviewOption) {
      return (
        typeof val === 'object' &&
        Boolean(val?.x && val?.y && val?.width && val?.height)
      )
    },
    convert(val: LibCamera.PreviewOption) {
      return `${val.x},${val.y},${val.width},${val.height}`
    },
  },
  fullscreen: {
    short: 'f',
    desc: 'Fullscreen preview mode',
  },
  'qt-preview': {
    desc: 'Use Qt-based preview window',
  },
  nopreview: {
    short: 'n',
    desc: 'Do not display a preview window',
  },
  'info-text': {
    desc: 'Set window title bar text <string>',
    validator: (val: string) => typeof val === 'string',
  },
  width: {
    desc: 'Capture image width <width>',
    validator: (val: number) => typeof val === 'number',
    convert: (val: number) => val.toString(),
  },
  height: {
    desc: 'Capture image height <height>',
    validator: (val: number) => typeof val === 'number',
    convert: (val: number) => val.toString(),
  },
  'viewfinder-width': {
    desc: 'Capture image width <width>',
    validator: (val: number) => typeof val === 'number',
    convert: (val: number) => val.toString(),
  },
  'viewfinder-height': {
    desc: 'Capture image height <height>',
    validator: (val: number) => typeof val === 'number',
    convert: (val: number) => val.toString(),
  },

  // ...

  output: {
    short: 'o',
    desc: 'Output file name <string>',
    validator: (val: string) => typeof val === 'string',
  },
} as const
