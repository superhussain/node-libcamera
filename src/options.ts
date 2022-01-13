export namespace LibCamera {
  export interface CommandLineOptions {
    /**
     * Print help information for the application
     *
     * The `--help` option causes every application to print its full set of command line options with a brief synopsis of each, and then quit.
     **/
    help: boolean
    /**
     * Print out a software version number
     *
     * All `libcamera-apps` will, when they see the `--version` option, print out a version string both for `libcamera` and `libcamera-apps` and then quit.
     */
    version: boolean
    /**
     * Delay before application stops automatically <milliseconds>
     *
     * The `--timeout` option specifies how long the application runs before it stops, whether it is recording a video or showing a preview. In the case of still image capture, the application will show the preview window for this long before capturing the output image.
     *
     * If unspecified, the default value is 5000 (5 seconds). The value zero causes the application to run indefinitely.
     */
    timeout: number
  }

  export interface PreviewWindowOptions {
    /**
     * Preview window settings
     *
     * Sets the size and location of the preview window (both X Windows and DRM versions). It does not affect the resolution or aspect ratio of images being requested from the camera. The camera images will be scaled to the size of the preview window for display, and will be pillar/letter-boxed to fit.
     *
     * Example:
     * ```json
     * { "x": 100, "y": 100, "width": 500, "height": 500 }
     * ```
     */
    preview: PreviewOption
    /**
     * Fullscreen preview mode
     *
     * Forces the preview window to use the whole screen, and the window will have no border or title bar. Again the image may be pillar/letter-boxed.
     */
    fullscreen: boolean
    /**
     * Use Qt-based preview window
     *
     * The preview window is switched to use the Qt-based implementation. This option is not normally recommended because it no longer uses zero-copy buffer sharing nor GPU acceleration and is therefore very expensive, however, it does support X forwarding (which the other preview implementations do not).
     *
     * The Qt preview window does not support the `--fullscreen` option. Generally it is advised to try and keep the preview window small.
     */
    'qt-preview': boolean
    /**
     * Do not display a preview window
     *
     * The preview window is suppressed entirely.
     */
    nopreview: boolean
    /**
     * Set window title bar text <string>
     *
     * The supplied string is set as the title of the preview window (when running under X Windows). Additionally the string may contain a number of `%` directives which are substituted with information from the image metadata. The permitted directives are:
     *
     * | Directive        | Substitution        |
     * | :--------------- | :------------------ |
     * | `%frame`         | The sequence number of the frame |
     * | `%fps`           | The instantaneous frame rate |
     * | `%exp`           | The shutter speed used to capture the image, in microseconds |
     * | `%ag`            | The analogue gain applied to the image in the sensor |
     * | `%dg`            | The digital gain applied to the image by the ISP |
     * | `%rg`            | The gain applied to the red component of each pixel |
     * | `%bg`            | The gain applied to the blue component of each pixel |
     * | `%focus`         | The focus metric for the image, where a larger value implies a sharper image |
     *
     * When not provided, the `--info-text` string defaults to `"#%frame (%fps fps) exp %exp ag %ag dg %dg"`.
     */
    'info-text': string
  }

  export interface CameraResolutionOptions {
    /**
     * Capture image width <width>
     *
     * This number specifies the output resolution of the camera images captured by libcamera-still, libcamera-jpeg and libcamera-vid.
     *
     * For libcamera-raw, it affects the size of the raw frames captured. Where a camera has a 2x2 binned readout mode, specifying a resolution not larger than this binned mode will result in the capture of 2x2 binned raw frames.
     *
     * For libcamera-hello these parameters have no effect.
     */
    width: number
    /**
     * Capture image height <height>
     *
     * This number specifies the output resolution of the camera images captured by libcamera-still, libcamera-jpeg and libcamera-vid.
     *
     * For libcamera-raw, it affects the size of the raw frames captured. Where a camera has a 2x2 binned readout mode, specifying a resolution not larger than this binned mode will result in the capture of 2x2 binned raw frames.
     *
     * For libcamera-hello these parameters have no effect.
     */
    height: number
  }

  export interface OutputFileOptions {
    /**
     * Output file name <string>
     *
     * `--output` sets the name of the output file to which the output image or video is written. Besides regular file names, this may take the following special values:
     *
     * `-` - write to stdout
     *
     * `udp://` - a string starting with this is taken as a network address for streaming
     *
     * `tcp://` - a string starting with this is taken as a network address for streaming
     *
     * a string containing a `%d` directive is taken as a file name where the format directive is replaced with a count that increments for each file that is opened. Standard C format directive modifiers are permitted.
     */
    output: string
  }

  export interface VideoOptions {
    /**
     * Saves timestamp information to the specified file. Useful as an input file to `mkvmerge`.
     */
    'save-pts': string
  }

  export type OptionsObject = CommandLineOptions &
    PreviewWindowOptions &
    CameraResolutionOptions &
    OutputFileOptions &
    VideoOptions

  export type OptionKeys = keyof OptionsObject
  export type OptionConverter = (val: any) => string

  export interface PreviewOption {
    x: number
    y: number
    width: number
    height: number
  }
}

export const optionConverterMap: Partial<Record<
  LibCamera.OptionKeys,
  LibCamera.OptionConverter
>> = {
  preview(val: LibCamera.PreviewOption) {
    return `${val.x},${val.y},${val.width},${val.height}`
  },
} as const
