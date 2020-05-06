import AppKit
import AVFoundation


extension CMTimeScale {
	/// This is what Apple recommends.
	static let video: CMTimeScale = 600
}


extension CMTime {
	init(videoFramesPerSecond: Int) {
		self.init(seconds: 1 / Double(videoFramesPerSecond), preferredTimescale: .video)
	}
}


extension CGDirectDisplayID {
	public static let main = CGMainDisplayID()
}


extension NSScreen {
	private func infoForCGDisplay(_ displayID: CGDirectDisplayID, options: Int) -> [AnyHashable: Any]? {
		var iterator: io_iterator_t = 0

		let result = IOServiceGetMatchingServices(kIOMasterPortDefault, IOServiceMatching("IODisplayConnect"), &iterator)
		guard result == kIOReturnSuccess else {
			print("Could not find services for IODisplayConnect: \(result)")
			return nil
		}

		var service = IOIteratorNext(iterator)
		while service != 0 {
			let info = IODisplayCreateInfoDictionary(service, IOOptionBits(options)).takeRetainedValue() as! [AnyHashable: Any]

			guard
				let vendorID = info[kDisplayVendorID] as! UInt32?,
				let productID = info[kDisplayProductID] as! UInt32?
			else {
				continue
			}

			if vendorID == CGDisplayVendorNumber(displayID) && productID == CGDisplayModelNumber(displayID) {
				return info
			}

			service = IOIteratorNext(iterator)
		}

		return nil
	}

	var id: CGDirectDisplayID {
		deviceDescription[NSDeviceDescriptionKey("NSScreenNumber")] as! CGDirectDisplayID
	}

	// TODO: Use the built-in `.localizedName` property instead when targeting macOS 10.15. I can then drop this and `infoForCGDisplay`.
	var name: String {
		guard let info = infoForCGDisplay(id, options: kIODisplayOnlyPreferredName) else {
			return "Unknown screen"
		}

		guard
			let localizedNames = info[kDisplayProductName] as? [String: Any],
			let name = localizedNames.values.first as? String
		else {
			return "Unnamed screen"
		}

		return name
	}
}


extension Optional {
	func unwrapOrThrow(_ errorExpression: @autoclosure () -> Error) throws -> Wrapped {
		guard let value = self else {
			throw errorExpression()
		}

		return value
	}
}


func sleep(for duration: TimeInterval) {
	usleep(useconds_t(duration * Double(USEC_PER_SEC)))
}