import Foundation
import AVFoundation

struct Options: Decodable {
  let destination: URL
  let framesPerSecond: Int
  let cropRect: CGRect?
  let showCursor: Bool
  let highlightClicks: Bool
  let screenId: CGDirectDisplayID
  let audioDeviceId: String?
  let videoCodec: String?
}

func record() throws {
  let options: Options = try CLI.arguments.first!.jsonDecoded()

  let recorder = try Aperture(
    destination: options.destination,
    framesPerSecond: options.framesPerSecond,
    cropRect: options.cropRect,
    showCursor: options.showCursor,
    highlightClicks: options.highlightClicks,
    screenId: options.screenId == 0 ? .main : options.screenId,
    audioDevice: options.audioDeviceId != nil ? AVCaptureDevice(uniqueID: options.audioDeviceId!) : nil,
    videoCodec: options.videoCodec
  )

  recorder.onStart = {
    print("R")
  }

  recorder.onFinish = { (error: Error?) -> Void in
    print(error, to: .standardError)
    exit(0)
  }

  CLI.onExit = {
    recorder.stop()
    // Do not call `exit()` here as the video is not always done
    // saving at this point and will be corrupted randomly
  }

  recorder.start()

  setbuf(__stdoutp, nil)
  RunLoop.main.run()
}

func showUsage() {
  print(
    """
    Usage:
      aperture <options>
      aperture list-screens
      aperture list-audio-devices
    """
  )
}

let encoder = JSONEncoder()

switch CLI.arguments.first {
case "list-screens":
  let shit = try encoder.encode(Aperture.Devices.screen())
  if shit != nil {
    print(String(data: shit, encoding: .utf8), to: .standardError)
  }
  exit(0)
case "list-audio-devices":
  // Uses stderr because of unrelated stuff being outputted on stdout
  let shit = try encoder.encode(Aperture.Devices.audio())
  if shit != nil {
    print(String(data: shit, encoding: .utf8), to: .standardError)
  }
  exit(0)
case .none:
  showUsage()
  exit(1)
default:
  try record()
}