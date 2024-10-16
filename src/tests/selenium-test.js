const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Use absolute path directly since it's not relative
const chromeDriverPath = 'd:\\webtools\\chromedriver.exe';

// Setup Chrome options and service
const service = new chrome.ServiceBuilder(chromeDriverPath);

(async function runTest() {
  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeService(service)
    .build();

  try {
    // 1. Load the application
    await driver.get('http://localhost:4200');
    console.log('Application loaded');

    // // 2. Click the "Applications" button in the toolbar
    // // let applicationsButton = await driver.wait(until.elementLocated(By.css('button#applicationsButton')), 10000); // Update selector to match your actual button selector
    // // await applicationsButton.click();
    // const element = await driver.findElement(By.css(".mdc-button:nth-child(2) > .mat-mdc-button-touch-target:nth-child(5)"))
    // await driver.actions({ bridge: true }).moveToElement(element).perform()
    // console.log('Clicked on "Applications" button');

    // // Wait for the applications page to load
    // await driver.wait(until.urlIs('http://localhost:4200/applications'), 10000);
    // console.log('Navigated to Applications page');

    // // 3. Click "View Details" on the desired application
    // let viewApplicationDetailsButton = await driver.wait(until.elementLocated(By.css('button#viewDetailsApp101')), 10000); // Update selector for the specific application ID button
    // await viewApplicationDetailsButton.click();
    // console.log('Clicked on "View Details" for Application 101');

    // // Wait for the application details page to load
    // await driver.wait(until.urlIs('http://localhost:4200/applications/101/'), 10000);
    // console.log('Navigated to Application 101 details page');

    // // 4. Click "View Details" on the desired design
    // let viewDesignDetailsButton = await driver.wait(until.elementLocated(By.css('button#viewDetailsDesign1001')), 10000); // Update selector for the specific design ID button
    // await viewDesignDetailsButton.click();
    // console.log('Clicked on "View Details" for Design 1001');

    // // Wait for the design details page to load
    // await driver.wait(until.urlIs('http://localhost:4200/applications/101/designs/1001'), 10000);
    // console.log('Navigated to Design 1001 details page');
  } catch (err) {
    console.error(`Test failed: ${err}`);
  } finally {
    await driver.quit();
  }
})();
