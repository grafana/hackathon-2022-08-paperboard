const puppeteer = require('puppeteer-core');

(async () => {

  const homedir = require('os').homedir();
  const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser',
        userDataDir: homedir + '/.config/chromium',
        defaultViewport: {width: 600, height: 448}
  });

  const page = await browser.newPage();
  await page.goto('https://soto.grafana.net/public-dashboards/d7a1f14e586a48ca8b072cb5694910ae?theme=light');
  await page.waitForNavigation({waitUntil: 'networkidle2'});
  await page.screenshot({path: 'screenshot.png'});
  await browser.close();
})();
