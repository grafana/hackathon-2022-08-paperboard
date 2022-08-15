const puppeteer = require('puppeteer-core');

(async () => {

  // 1. Launch the browser
  //  const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser', 
        userDataDir: '/home/soto/.config/chromium',
        defaultViewport: {width: 600, height: 448}
  });

  // 2. Open a new page
  const page = await browser.newPage();

  // 3. Navigate to URL
  await page.goto('https://soto.grafana.net/public-dashboards/d7a1f14e586a48ca8b072cb5694910ae?theme=light');

  await page.waitForNavigation({waitUntil: 'networkidle2'});

        // 4. Take screenshot
  await page.screenshot({path: 'screenshot.png'});

  await browser.close();
})();
