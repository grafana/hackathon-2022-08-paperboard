const puppeteer = require('puppeteer-core');
const { program } = require('commander');

program
  .option('--url <string>', 'URL to screenshot', 'https://soto.grafana.net/public-dashboards/d7a1f14e586a48ca8b072cb5694910ae?theme=light')
  .option('--outfile <string>', 'Name of the file to write to', 'screenshot.png')
  .option('--oversample <number>', 'Multiplier from native screen res to viewport size', '2')
  .option('--show-browser', 'Show browser window (non-headless mode)');

program.parse();

(async () => {
  const options = program.opts();
  const homedir = require('os').homedir();
  const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser',
        userDataDir: homedir + '/.config/chromium',
        defaultViewport: {width: 600*options.oversample, height: 448*options.oversample},
	headless: !options.showBrowser,
  });

  const page = await browser.newPage();
  await page.goto(options.url);
  //await page.waitForNavigation({waitUntil: 'networkidle2'});
  await page.waitForSelector('.panel-title', { timeout: 60000 });
  await page.waitForTimeout({milliseconds: 30000});
  await page.screenshot({path: 'screenshot.png'});
  await browser.close();
})();
