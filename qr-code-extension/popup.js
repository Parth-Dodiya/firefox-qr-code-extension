/**
 * Function to get the current tab's URL and generate a QR code.
 */
function generateQrCodeForCurrentTab() {
  // browser.tabs.query is an asynchronous function that returns a Promise.
  // We query for the tab that is active in the current window.
  browser.tabs.query({ active: true, currentWindow: true })
    .then((tabs) => {
      // The query returns an array of tabs, but we only need the first one.
      const currentTab = tabs[0];
      if (currentTab && currentTab.url) {
        const url = currentTab.url;
        
        // Find the placeholder div.
        const qrcodeContainer = document.getElementById('qrcode');
        // Clear any previous QR code.
        qrcodeContainer.innerHTML = "";

        // Generate the new QR code.
        new QRCode(qrcodeContainer, {
          text: url,
          width: 256,
          height: 256,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H
        });
      } else {
        console.error("Could not get the active tab's URL.");
        document.getElementById('qrcode').textContent = 'Could not get URL.';
      }
    })
    .catch((error) => {
      console.error(`Error querying tabs: ${error}`);
      document.getElementById('qrcode').textContent = 'Error loading URL.';
    });
}

// Run the function as soon as the popup is opened.
generateQrCodeForCurrentTab();