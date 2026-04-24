import UIKit
import Capacitor

class MAHJViewController: CAPBridgeViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Disable pinch-to-zoom and auto-zoom on input focus
        webView?.scrollView.minimumZoomScale = 1.0
        webView?.scrollView.maximumZoomScale = 1.0
        webView?.scrollView.isMultipleTouchEnabled = false
    }
}
