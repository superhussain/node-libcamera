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

    /**
     * Capture image width <width>
     *
     * These options affect only the preview and specify the image size that will be requested from the camera for the preview window. They have no effect on captured still images or videos. Nor do they affect the preview window as the images are resized to fit.
     */
    'viewfinder-width': number

    /**
     * Capture image height <height>
     *
     * These options affect only the preview and specify the image size that will be requested from the camera for the preview window. They have no effect on captured still images or videos. Nor do they affect the preview window as the images are resized to fit.
     */
    'viewfinder-height': number

    /**
     * Force sensor to capture in full resolution mode
     *
     * This option forces the sensor to be driven in its full resolution readout mode for still and video capture, irrespective of the requested output resolution (given by `--width` and `--height`).
     *
     * Using this option often incurs a frame rate penalty, as larger resolution frames are slower to read out.
     *
     * Example:
     * ```bash
     * libcamera-raw -t 2000 --segment 1 --rawfull -o test%03d.raw
     * ```
     * will cause multiple full resolution raw frames to be captured. On the HQ camera each frame will be about 18MB in size. Without the `rawfull` option the default video output resolution would have caused the 2x2 binned mode to be selected, resulting in 4.5MB raw frames.
     */
    rawfull: boolean

    /**
     * Low resolution image width <width>
     *
     * `libcamera` allows the possibiliy of delivering a second lower resolution image stream from the the camera system to the application. This stream is available in both the preview and the video modes (i.e. `libcamera-hello` and the preview phase of `libcamera-still`, and `libcamera-vid`), and can be used, among other things, for image analysis. For still captures, the low resolution image stream is not available.
     *
     * The low resolution stream has the same field of view as the other image streams. If a different aspect ratio is specified for the low resolution stream, then those images will be squashed so that the pixels are no longer square.
     *
     * During video recording (`libcamera-vid`), specifying a low resolution stream will disable some extra colour denoise processing that would normally occur.
     */
    'lores-width': number

    /**
     * Low resolution image height <height>
     *
     * `libcamera` allows the possibiliy of delivering a second lower resolution image stream from the the camera system to the application. This stream is available in both the preview and the video modes (i.e. `libcamera-hello` and the preview phase of `libcamera-still`, and `libcamera-vid`), and can be used, among other things, for image analysis. For still captures, the low resolution image stream is not available.
     *
     * The low resolution stream has the same field of view as the other image streams. If a different aspect ratio is specified for the low resolution stream, then those images will be squashed so that the pixels are no longer square.
     *
     * During video recording (`libcamera-vid`), specifying a low resolution stream will disable some extra colour denoise processing that would normally occur.
     */
    'lores-height': number

    /**
     * Read out with horizontal mirror
     */
    hflip: boolean

    /**
     * Read out with vertical flip
     */
    vflip: boolean

    /**
     * Use hflip and vflip to create the given rotation <angle>
     */
    rotation: 0 | 180

    /**
     * Select a crop (region of interest) from the camera <x,y,w,h>
     *
     * The `roi` (region of interest) option allows the user to select a particular crop from the full field of view provided by the sensor. The coordinates are specified as a proportion of the available field of view, so that `roi: { x: 0, y: 0, w: 1, h: 1 }` would have no effect at all.
     *
     * The `roi` parameter implements what is commonly referred to as "digital zoom".
     *
     * Example `roi: { x: 0.25, y: 0.25, w: 0.5, h: 0.5 }` will select exactly a quarter of the total number of pixels cropped from the centre of the image.
     */
    roi: ROIOption
  }

  export interface CameraControlOptions {
    /**
     * Set image sharpness <number>
     *
     * The given `<number>` adjusts the image sharpness. The value zero means that no sharpening is applied, the value 1.0 uses the default amount of sharpening, and values greater than 1.0 use extra sharpening.
     */
    sharpness: number

    /**
     * Set image contrast <number>
     *
     * The given `<number>` adjusts the image contrast. The value zero produces minimum contrast, the value 1.0 uses the default amount of contrast, and values greater than 1.0 apply extra contrast.
     */
    contrast: number

    /**
     * Set image brightness <number>
     *
     * The given `<number>` adjusts the image brightness. The value -1.0 produces an (almost) black image, the value 1.0 produces an almost entirely white image and the value 0.0 produces standard image brightness.
     *
     * Note that the brightness parameter adds (or subtracts) an offset from all pixels in the output image. The `ev` option is often more appropriate.
     */
    brightness: number

    /**
     * Set image colour saturation <number>
     *
     * The given `<number>` adjusts the colour saturation. The value zero produces a greyscale image, the value 1.0 uses the default amount of sautration, and values greater than 1.0 apply extra colour saturation.
     */
    saturation: number

    /**
     * Set EV compensation <number>
     *
     * Sets the EV compensation of the image in units of stops, in the range -10 to 10. Default is 0. It works by raising or lowering the target values the AEC/AGC algorithm is attempting to match.
     */
    ev: number

    /**
     * Set the exposure time in microseconds <number>
     *
     * The shutter time is fixed to the given value. The gain will still be allowed to vary (unless that is also fixed).
     *
     * Note that this shutter time may not be achieved if the camera is running at a frame rate that is too fast to allow it. In this case the `framerate` option may be used to lower the frame rate. The maximum possible shutter times for the official Raspberry Pi supported can be found in this table.
     *
     * Using values above these maximums will result in undefined behaviour. Cameras will also have different minimum shutter times, though in practice this is not important as they are all low enough to expose bright scenes appropriately.
     */
    shutter: number

    /**
     * Sets the combined analogue and digital gains <number>
     *
     * Where the requested gain can be supplied by the sensor driver, then only analogue gain will be used. Once the analogue gain reaches the maximum permitted value, then extra gain beyond this will be supplied as digital gain.
     *
     * Note that there are circumstances where the digital gain can go above 1 even when the analogue gain limit is not exceeded. This can occur when
     *
     * * Either of the colour gains goes below 1.0, which will cause the digital gain to settle to 1.0/min(red_gain,blue_gain). This means that the total digital gain being applied to any colour channel does not go below 1.0, as that would cause discolouration artifacts.
     *
     * * The digital gain can vary slightly while the AEC/AGC changes, though this effect should be only transient.
     */
    gain: number

    /**
     * Sets the combined analogue and digital gains <number>
     *
     * Where the requested gain can be supplied by the sensor driver, then only analogue gain will be used. Once the analogue gain reaches the maximum permitted value, then extra gain beyond this will be supplied as digital gain.
     *
     * Note that there are circumstances where the digital gain can go above 1 even when the analogue gain limit is not exceeded. This can occur when
     *
     * * Either of the colour gains goes below 1.0, which will cause the digital gain to settle to 1.0/min(red_gain,blue_gain). This means that the total digital gain being applied to any colour channel does not go below 1.0, as that would cause discolouration artifacts.
     *
     * * The digital gain can vary slightly while the AEC/AGC changes, though this effect should be only transient.
     */
    analoggain: number

    /**
     * Set the metering mode <string>
     *
     * Sets the metering mode of the AEC/AGC algorithm. This may one of the following values
     *
     * * `centre` - centre weighted metering (which is the default)
     * * `spot` - spot metering
     * * `average` - average or whole frame metering
     * * `custom` - custom metering mode which would have to be defined in the camera tuning file.
     *
     * For more information on defining a custom metering mode, and also on how to adjust the region weights in the existing metering modes, please refer to the [Tuning guide for the Raspberry Pi cameras and libcamera](https://datasheets.raspberrypi.com/camera/raspberry-pi-camera-guide.pdf).
     */
    metering: 'centre' | 'spot' | 'average' | 'custom'

    /**
     * Set the exposure profile <string>
     *
     * The exposure profile may be either `normal` or `sport`. Changing the exposure profile should not affect the overall exposure of an image, but the `sport` mode will tend to prefer shorter exposure times and larger gains to achieve the same net result.
     *
     * Exposure profiles can be edited in the camera tuning file. Please refer to the [Tuning guide for the Raspberry Pi cameras and libcamera](https://datasheets.raspberrypi.com/camera/raspberry-pi-camera-guide.pdf) for more information.
     */
    exposure: 'normal' | 'sport'

    /**
     * Set the AWB mode <string>
     *
     * This option sets the AWB algorithm into the named AWB mode. Valid modes are:
     *
     * | Mode name        | Colour temperature  |
     * | :--------------- | :------------------ |
     * | `auto`           | 2500K to 8000K      |
     * | `incandescent`   | 2500K to 3000K      |
     * | `tungsten`       | 3000K to 3500K      |
     * | `fluorescent`    | 4000K to 4700K      |
     * | `indoor`         | 3000K to 5000K      |
     * | `daylight`       | 5500K to 6500K      |
     * | `cloudy`         | 7000K to 8500K      |
     * | `custom`         | A custom range would have to be defined in the camera tuning file. |
     *
     * There is no mode that turns the AWB off, instead fixed colour gains should be specified with the `awbgains` option.
     *
     * Note that these values are only approximate, the values could vary according to the camera tuning.
     *
     * For more information on AWB modes and how to define a custom one, please refer to the Tuning guide for the Raspberry Pi cameras and libcamera.
     */
    awb: string

    /**
     * Set fixed colour gains <number,number>
     *
     * This option accepts a red and a blue gain value and uses them directly in place of running the AWB algorithm. Setting non-zero values here has the effect of disabling the AWB calculation.
     */
    awbgains: [number, number]

    /**
     * Set the denoising mode <string>
     *
     * The following denoise modes are supported:
     * * `auto` - This is the default. It always enables standard spatial denoise. It uses extra fast colour denoise for video, and high quality colour denoise for stills capture. Preview does not enable any extra colour denoise at all.
     * * `off` - Disables spatial and colour denoise.
     * * `cdn_off` - Disables colour denoise.
     * * `cdn_fast` - Uses fast color denoise.
     * * `cdn_hq` - Uses high quality colour denoise. Not appropriate for video/viewfinder due to reduced throughput.
     *
     * Note that even the use of fast colour denoise can result in lower framerates. The high quality colour denoise will normally result in much lower framerates.
     */
    denoise: 'auto' | 'off' | 'cdn_off' | 'cdn_fast' | 'cdn_hq'

    /**
     * Specify the camera tuning to use <string>
     *
     * This identifies the name of the JSON format tuning file that should be used. The tuning file covers many aspects of the image processing, including the AEC/AGC, AWB, colour shading correction, colour processing, denoising and so forth.
     *
     * For more information on the camera tuning file, please consult the [Tuning guide for the Raspberry Pi cameras and libcamera](https://datasheets.raspberrypi.com/camera/raspberry-pi-camera-guide.pdf).
     */
    'tuning-file': string
  }

  export interface OutputFileOptions {
    /**
     * Output file name <string>
     *
     * `--output` sets the name of the output file to which the output image or video is written. Besides regular file names, this may take the following special values:
     *
     * * `-` - write to stdout
     *
     * * `udp://` - a string starting with this is taken as a network address for streaming
     *
     * * `tcp://` - a string starting with this is taken as a network address for streaming
     *
     * * a string containing a `%d` directive is taken as a file name where the format directive is replaced with a count that increments for each file that is opened. Standard C format directive modifiers are permitted.
     */
    output: string

    /**
     * Wrap output file counter at <number>
     *
     * When outputting to files with an incrementing counter (e.g. `%d` in the output file name), wrap the counter back to zero when it reaches this value.
     */
    wrap: number

    /**
     * Flush output files immediately
     *
     * `flush` causes output files to be flushed to disk as soon as every frame is written, rather than waiting for the system to do it.
     */
    flush: boolean
  }

  export interface PostProcessingOptions {
    /**
     * The `post-process-file` option specifies a JSON file that configures the post-processing that the imaging pipeline applies to camera images before they reach the application. It can be thought of as a replacement for the legacy raspicam "image effects".
     *
     * Post-processing is a large topic and admits the use of 3rd party software like OpenCV and TensorFlowLite to analyse and manipulate images. For more information, please refer to the section on [post-processing](https://www.raspberrypi.com/documentation/accessories/camera.html#post-processing).
     */
    'post-process-file': string
  }

  export interface StillOptions {
    /**
     * JPEG quality <number>
     *
     * Set the JPEG quality. 100 is maximum quality and 93 is the default. Only applies when saving JPEG files.
     */
    quality: number

    /**
     * Add extra EXIF tags <string>
     *
     * The given extra EXIF tags are saved in the JPEG file. Only applies when saving JPEG files.
     *
     * EXIF is supported using the `libexif` library and so there are some associated limitations. In particular, `libexif` seems to recognise a number of tags but without knowing the correct format for them. The software will currently treat these (incorrectly, in many cases) as ASCII, but will print a warning to the terminal. As we come across these they can be added to the table of known exceptions in the software.
     *
     * Clearly the application needs to supply EXIF tags that contain specific camera data (like the exposure time). But for other tags that have nothing to do with the camera, a reasonable workaround would simply be to add them post facto, using something like `exiftool`.
     */
    exif: string

    /**
     * Time interval between timelapse captures <milliseconds>
     *
     * This puts `libcamera-still` into timelapse mode where it runs according to the timeout (`timeout`) that has been set, and for that period will capture repeated images at the interval specified here. (`libcamera-still` only.)
     */
    timelapse: number

    /**
     * The starting value for the frame counter <number>
     *
     * When writing counter values into the output file name, this specifies the starting value for the counter.
     *
     * Example:
     * ```bash
     * libcamera-still -t 100000 -o test%d.jpg --timelapse 10000 --framestart 1
     * ```
     * captures an image every 10s for about 100s, starting at 1 rather than 0. (`libcamera-still` only.)
     */
    framestart: number

    /**
     * Use date format for the output file names
     *
     * Use the current date and time to construct the output file name, in the form MMDDhhmmss.jpg, where MM = 2-digit month number, DD = 2-digit day number, hh = 2-digit 24-hour hour number, mm = 2-digit minute number, ss = 2-digit second number. (`libcamera-still` only.)
     */
    datetime: boolean

    /**
     * Use system timestamps for the output file names
     *
     * Uses the current system timestamp (the number of seconds since the start of 1970) as the the output file name. (`libcamera-still` only.)
     */
    timestamp: boolean

    /**
     * Set the JPEG restart interval <number>
     *
     * Sets the JPEG restart interval to the given value. Default is zero.
     */
    restart: number

    /**
     * Capture image when Enter pressed
     *
     * This switches `libcamera-still` into keypress mode. It will capture a still image either when the timeout expires or the Enter key is pressed in the terminal window. Typing x and Enter causes `libcamera-still` to quit without capturing.
     */
    keypress: boolean

    /**
     * Capture image when SIGUSR1 received
     *
     * This switches `libcamera-still` into signal mode. It will capture a still image either when the timeout expires or a SIGUSR1 is received. SIGUSR2 will cause `libcamera-still` to quit without capturing.
     *
     * Example:
     *
     * ```bash
     * libcamera-still -t 0 -o test.jpg -s &
     * ```
     *
     * then
     *
     * ```bash
     * kill -SIGUSR1 $!
     * ```
     */
    signal: boolean

    /**
     * Set thumbnail parameters <w:h:q>
     *
     * Sets the dimensions and quality parameter of the associated thumbnail image. The defaults are size 320x240 and quality 70.
     */
    thumb: ThumbOption

    /**
     * Set the still image codec <string>
     *
     * Select the still image encoding to be used. Valid encoders are:
     * * `jpg` - JPEG (the default)
     * * `png` - PNG format
     * * `bmp` - BMP format
     * * `rgb` - binary dump of uncompressed RGB pixels
     * * `yuv420` - binary dump of uncompressed YUV420 pixels.
     *
     * Note that this option determines the encoding and that the extension of the output file name is ignored for this purpose. However, for the `datetime` and `timestamp` options, the file extension is taken from the encoder name listed above. (`libcamera-still` only.)
     */
    encoding: 'jpg' | 'png' | 'bmp' | 'rgb' | 'yuv420'

    /**
     * Save raw file
     *
     * Save a raw Bayer file in DNG format alongside the usual output image. The file name is given by replacing the output file name extension by `.dng`. These are standard DNG files, and can be processed with standard tools like dcraw or RawTherapee, among others. (`libcamera-still` only.)
     *
     * The image data in the raw file is exactly what came out of the sensor, with no processing whatsoever either by the ISP or anything else. The EXIF data saved in the file, among other things, includes:
     * * exposure time
     * * analogue gain (the ISO tag is 100 times the analogue gain used)
     * * white balance gains (which are the reciprocals of the "as shot neutral" values)
     * * the colour matrix used by the ISP.
     */
    raw: boolean

    /**
     * Make symbolic link to latest file saved <string>
     *
     * This causes `libcamera-still` to make a symbolic link to the most recently saved file, thereby making it easier to identify. (`libcamera-still` only.)
     */
    latest: string
  }

  export interface VideoOptions {
    /**
     * JPEG quality <number>
     *
     * Set the JPEG quality. 100 is maximum quality and 50 is the default. Only applies when saving in MJPEG format.
     */
    quality: number

    /**
     * H.264 bitrate <number>
     *
     * Set the target bitrate for the H.264 encoder, in bits per second. Only applies when encoding in H.264 format.
     */
    bitrate: number

    /**
     * Intra-frame period (H.264 only) <number>
     *
     * Sets the frequency of I (Intra) frames in the H.264 bitstream, as a number of frames. The default value is 60.
     */
    intra: number

    /**
     * H.264 profile <string>
     *
     * Set the H.264 profile. The value may be `baseline`, `main` or `high`.
     */
    profile: 'baseline' | 'main' | 'high'

    /**
     * H.264 level <string>
     *
     * Set the H.264 level. The value may be 4, 4.1 or 4.2.
     */
    level: '4' | '4.1' | '4.2'

    /**
     * Encoder to be used <string>
     *
     * This can select how the video frames are encoded. Valid options are:
     * * `h264` - use H.264 encoder (the default)
     * * `mjpeg` - use MJPEG encoder
     * * `yuv420` - output uncompressed YUV420 frames.
     */
    codec: 'h264' | 'mjpeg' | 'yuv420'

    /**
     * Toggle between recording and pausing
     *
     * Pressing Enter will toggle `libcamera-vid` between recording the video stream and not recording it (i.e. discarding it). The application starts off in the recording state, unless the `initial` option specifies otherwise. Typing `x` and Enter causes `libcamera-vid` to quit.
     */
    keypress: boolean

    /**
     * Toggle between recording and pausing when SIGUSR1 received
     *
     * The SIGUSR1 signal will toggle `libcamera-vid` between recording the video stream and not recording it (i.e. discarding it). The application starts off in the recording state, unless the `initial` option specifies otherwise. SIGUSR2 causes `libcamera-vid` to quit.
     *
     * Example:
     *
     * ```bash
     * libcamera-vid -t 0 -o test.h264 -s
     * ```
     *
     * then
     *
     * ```bash
     * kill -SIGUSR1 $!
     * ```
     */
    signal: boolean

    /**
     * Start the application in the recording or paused state <string>
     *
     * The value passed may be `record` or `pause` to start the application in, respectively, the recording or the paused state. This option should be used in conjunction with either `keypress` or `signal` to toggle between the two states.
     */
    initial: 'record' | 'pause'

    /**
     * Split multiple recordings into separate files
     *
     * This option should be used in conjunction with `keypress` or `signal` and causes each recording session (inbetween the pauses) to be written to a separate file.
     */
    split: boolean

    /**
     * Write the video recording into multiple segments <number>
     *
     * This option causes the video recording to be split accross multiple files where the parameter gives the approximate duration of each file in milliseconds.
     *
     * One convenient little trick is to pass a very small duration parameter (namely, `segment: 1`) which will result in each frame being written to a separate output file. This makes it easy to do "burst" JPEG capture (using the MJPEG codec), or "burst" raw frame capture (using `libcamera-raw`).
     */
    segment: number

    /**
     * Write the video recording into a circular buffer.
     *
     * The video recording is written to a circular buffer which is written to disk when the application quits. The size of the circular buffer is 4MB.
     */
    circular: boolean

    /**
     * Write sequence header in every I frame (H.264 only)
     *
     * This option causes the H.264 sequence headers to be written into every I (Intra) frame. This is helpful because it means a client can understand and decode the video sequence from any I frame, not just from the very beginning of the stream. It is recommended to use this option with any output type that breaks the output into pieces (`segment`, `split`, `circular`), or transmits the output over a network.
     */
    inline: boolean

    /**
     * Wait for an incoming TCP connection
     *
     * This option is provided for streaming over a network using TCP/IP. Using `listen` will cause `libcamera-vid` to wait for an incoming client connection before starting the video encode process, which will then be forwarded to that client.
     */
    listen: boolean

    /**
     * Saves timestamp information to the specified file. Useful as an input file to `mkvmerge`.
     */
    'save-pts': string
  }

  export type BaseOptions = CommandLineOptions &
    PreviewWindowOptions &
    CameraResolutionOptions &
    CameraControlOptions &
    OutputFileOptions &
    PostProcessingOptions

  export type StillOptionsObject = BaseOptions & StillOptions
  export type VideoOptionsObject = BaseOptions & VideoOptions
  export type OptionsObject = BaseOptions & StillOptions & VideoOptions
  export type OptionKeys = keyof OptionsObject
  export type OptionConverter = (val: any) => string

  export interface PreviewOption {
    x: number
    y: number
    width: number
    height: number
  }

  export interface ThumbOption {
    width: number
    height: number
    quality: number
  }

  export interface ROIOption {
    x: number
    y: number
    w: number
    h: number
  }
}

export default LibCamera
