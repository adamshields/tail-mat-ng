const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Use absolute path directly since it's not relative
const chromeDriverPath = 'd:\\webtools\\chromedriver.exe';

// Setup Chrome options and service
const service = new chrome.ServiceBuilder(chromeDriverPath);

// Generated by Selenium IDE

const assert = require('assert')

describe('basic', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('basic', async function() {
    // Test name: basic
    // Step # | name | target | value
    // 1 | open | / |
    await driver.get("http://localhost:4200/")
    // 2 | setWindowSize | 974x1080 |
    await driver.manage().window().setRect({ width: 974, height: 1080 })
    // 3 | mouseOver | css=.mdc-button:nth-child(2) > .mat-mdc-button-touch-target:nth-child(5) |
    {
      const element = await driver.findElement(By.css(".mdc-button:nth-child(2) > .mat-mdc-button-touch-target:nth-child(5)"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 4 | mouseOut | css=.mdc-button:nth-child(2) > .mat-mdc-button-touch-target:nth-child(5) |
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    // 5 | click | css=.cdk-focused > .mdc-button__label |
    await driver.findElement(By.css(".cdk-focused > .mdc-button__label")).click()
    // 6 | mouseOver | css=.mat-mdc-row:nth-child(2) .mat-mdc-button-touch-target |
    {
      const element = await driver.findElement(By.css(".mat-mdc-row:nth-child(2) .mat-mdc-button-touch-target"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 7 | mouseOut | css=.mat-mdc-row:nth-child(2) .mat-mdc-button-touch-target |
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    // 8 | mouseOver | css=.mat-mdc-row:nth-child(1) .mat-mdc-button-touch-target |
    {
      const element = await driver.findElement(By.css(".mat-mdc-row:nth-child(1) .mat-mdc-button-touch-target"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 9 | mouseOut | css=.mat-mdc-row:nth-child(1) .mat-mdc-button-touch-target |
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    // 10 | click | css=.cdk-focused > .mdc-button__label |
    await driver.findElement(By.css(".cdk-focused > .mdc-button__label")).click()
    // 11 | mouseOver | css=.mat-mdc-row:nth-child(1) .mat-mdc-button-touch-target |
    {
      const element = await driver.findElement(By.css(".mat-mdc-row:nth-child(1) .mat-mdc-button-touch-target"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 12 | mouseOut | css=.mat-mdc-row:nth-child(1) .mat-mdc-button-touch-target |
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    // 13 | click | css=.cdk-focused > .mdc-button__label |
    await driver.findElement(By.css(".cdk-focused > .mdc-button__label")).click()
    // 14 | mouseOver | css=.mdc-button:nth-child(1) > .mat-mdc-button-touch-target |
    {
      const element = await driver.findElement(By.css(".mdc-button:nth-child(1) > .mat-mdc-button-touch-target"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 15 | mouseOut | css=.mdc-button:nth-child(1) > .mat-mdc-button-touch-target |
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    // 16 | click | css=.cdk-focused > .mdc-button__label |
    await driver.findElement(By.css(".cdk-focused > .mdc-button__label")).click()
    // 17 | mouseOver | css=.mdc-button:nth-child(3) > .mat-mdc-button-touch-target |
    {
      const element = await driver.findElement(By.css(".mdc-button:nth-child(3) > .mat-mdc-button-touch-target"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 18 | mouseOut | css=.mdc-button:nth-child(3) > .mat-mdc-button-touch-target |
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    // 19 | click | css=.cdk-focused > .mdc-button__label |
    await driver.findElement(By.css(".cdk-focused > .mdc-button__label")).click()
    // 20 | mouseOver | css=.mdc-button:nth-child(4) > .mat-mdc-button-touch-target |
    {
      const element = await driver.findElement(By.css(".mdc-button:nth-child(4) > .mat-mdc-button-touch-target"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 21 | mouseOut | css=.mdc-button:nth-child(4) > .mat-mdc-button-touch-target |
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    // 22 | mouseOver | css=.mdc-button:nth-child(4) > .mdc-button__label |
    {
      const element = await driver.findElement(By.css(".mdc-button:nth-child(4) > .mdc-button__label"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 23 | click | css=.cdk-focused > .mdc-button__label |
    await driver.findElement(By.css(".cdk-focused > .mdc-button__label")).click()
    // 24 | mouseOut | css=.cdk-focused > .mdc-button__label |
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    // 25 | mouseOver | css=.mdc-button:nth-child(5) > .mat-mdc-button-touch-target |
    {
      const element = await driver.findElement(By.css(".mdc-button:nth-child(5) > .mat-mdc-button-touch-target"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 26 | mouseOut | css=.mdc-button:nth-child(5) > .mat-mdc-button-touch-target |
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    // 27 | mouseOver | css=.mat-mdc-menu-trigger:nth-child(5) > .mat-icon:nth-child(3) |
    {
      const element = await driver.findElement(By.css(".mat-mdc-menu-trigger:nth-child(5) > .mat-icon:nth-child(3)"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 28 | click | css=.cdk-focused > .mat-icon:nth-child(3) |
    await driver.findElement(By.css(".cdk-focused > .mat-icon:nth-child(3)")).click()
    // 29 | mouseOut | css=.mat-mdc-menu-trigger:nth-child(5) > .mat-icon:nth-child(3) |
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    // 30 | click | css=.cdk-focused > .mat-mdc-menu-item-text |
    await driver.findElement(By.css(".cdk-focused > .mat-mdc-menu-item-text")).click()
    // 31 | mouseOver | css=.cdk-focused > .mat-mdc-button-touch-target |
    {
      const element = await driver.findElement(By.css(".cdk-focused > .mat-mdc-button-touch-target"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 32 | click | css=.cdk-focused > .mat-mdc-button-touch-target |
    await driver.findElement(By.css(".cdk-focused > .mat-mdc-button-touch-target")).click()
    // 33 | mouseOut | css=.mdc-button:nth-child(5) > .mat-mdc-button-touch-target |
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    // 34 | mouseOver | css=.mat-mdc-menu-item:nth-child(2) |
    {
      const element = await driver.findElement(By.css(".mat-mdc-menu-item:nth-child(2)"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 35 | click | css=.cdk-focused |
    await driver.findElement(By.css(".cdk-focused")).click()
    // 36 | mouseOut | css=.mat-mdc-menu-item:nth-child(2) |
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    // 37 | mouseOver | css=.mat-mdc-menu-trigger:nth-child(7) > .mat-mdc-button-touch-target |
    {
      const element = await driver.findElement(By.css(".mat-mdc-menu-trigger:nth-child(7) > .mat-mdc-button-touch-target"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 38 | mouseOut | css=.mat-mdc-menu-trigger:nth-child(7) > .mat-mdc-button-touch-target |
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    // 39 | mouseOver | css=.mat-mdc-menu-trigger:nth-child(7) > .mat-icon:nth-child(3) |
    {
      const element = await driver.findElement(By.css(".mat-mdc-menu-trigger:nth-child(7) > .mat-icon:nth-child(3)"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 40 | click | css=.cdk-focused > .mat-icon:nth-child(3) |
    await driver.findElement(By.css(".cdk-focused > .mat-icon:nth-child(3)")).click()
    // 41 | mouseOut | css=.mat-mdc-menu-trigger:nth-child(7) > .mat-icon:nth-child(3) |
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    // 42 | mouseOver | css=.cdk-focused > .mat-mdc-menu-item-text |
    {
      const element = await driver.findElement(By.css(".cdk-focused > .mat-mdc-menu-item-text"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 43 | click | css=.cdk-focused > .mat-mdc-menu-item-text |
    await driver.findElement(By.css(".cdk-focused > .mat-mdc-menu-item-text")).click()
    // 44 | mouseOut | css=.mat-mdc-menu-item:nth-child(1) > .mat-mdc-menu-item-text |
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    // 45 | mouseOver | css=.cdk-focused > .mat-icon:nth-child(3) |
    {
      const element = await driver.findElement(By.css(".cdk-focused > .mat-icon:nth-child(3)"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 46 | click | css=.cdk-focused > .mat-icon:nth-child(3) |
    await driver.findElement(By.css(".cdk-focused > .mat-icon:nth-child(3)")).click()
    // 47 | mouseOut | css=.mat-mdc-menu-trigger:nth-child(7) > .mat-icon:nth-child(3) |
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    // 48 | mouseOver | css=.mat-mdc-menu-item:nth-child(2) > .mat-mdc-menu-item-text |
    {
      const element = await driver.findElement(By.css(".mat-mdc-menu-item:nth-child(2) > .mat-mdc-menu-item-text"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 49 | click | css=.cdk-focused > .mat-mdc-menu-item-text |
    await driver.findElement(By.css(".cdk-focused > .mat-mdc-menu-item-text")).click()
    // 50 | mouseOut | css=.mat-mdc-menu-item:nth-child(2) > .mat-mdc-menu-item-text |
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    // 51 | mouseOver | css=.cdk-focused > .mat-mdc-button-touch-target |
    {
      const element = await driver.findElement(By.css(".cdk-focused > .mat-mdc-button-touch-target"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 52 | click | css=.cdk-focused > .mat-mdc-button-touch-target |
    await driver.findElement(By.css(".cdk-focused > .mat-mdc-button-touch-target")).click()
    // 53 | mouseOut | css=.mat-mdc-menu-trigger:nth-child(7) > .mat-mdc-button-touch-target |
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    // 54 | click | css=.cdk-focused > .mat-mdc-menu-item-text |
    await driver.findElement(By.css(".cdk-focused > .mat-mdc-menu-item-text")).click()
    // 55 | mouseOver | css=.cdk-focused > .mat-mdc-button-touch-target |
    {
      const element = await driver.findElement(By.css(".cdk-focused > .mat-mdc-button-touch-target"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 56 | click | css=.cdk-focused > .mat-mdc-button-touch-target |
    await driver.findElement(By.css(".cdk-focused > .mat-mdc-button-touch-target")).click()
    // 57 | mouseOut | css=.mat-mdc-menu-trigger:nth-child(7) > .mat-mdc-button-touch-target |
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    // 58 | click | css=.cdk-focused |
    await driver.findElement(By.css(".cdk-focused")).click()
    // 59 | mouseOver | css=.cdk-focused > .mat-mdc-button-touch-target |
    {
      const element = await driver.findElement(By.css(".cdk-focused > .mat-mdc-button-touch-target"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 60 | click | css=.cdk-focused > .mat-mdc-button-touch-target |
    await driver.findElement(By.css(".cdk-focused > .mat-mdc-button-touch-target")).click()
    // 61 | mouseOut | css=.mat-mdc-menu-trigger:nth-child(7) > .mat-mdc-button-touch-target |
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    // 62 | click | css=.cdk-focused > .mat-mdc-menu-item-text |
    await driver.findElement(By.css(".cdk-focused > .mat-mdc-menu-item-text")).click()
    // 63 | mouseOver | css=.theme-toggle > .mat-mdc-button-touch-target |
    {
      const element = await driver.findElement(By.css(".theme-toggle > .mat-mdc-button-touch-target"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 64 | mouseOut | css=.theme-toggle > .mat-mdc-button-touch-target |
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    // 65 | mouseOver | css=.theme-toggle > .mat-icon |
    {
      const element = await driver.findElement(By.css(".theme-toggle > .mat-icon"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 66 | click | css=.theme-toggle > .mat-icon |
    await driver.findElement(By.css(".theme-toggle > .mat-icon")).click()
    // 67 | mouseOut | css=.theme-toggle > .mat-icon |
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    // 68 | mouseOver | css=.mat-mdc-menu-item:nth-child(2) > .mat-mdc-menu-item-text |
    {
      const element = await driver.findElement(By.css(".mat-mdc-menu-item:nth-child(2) > .mat-mdc-menu-item-text"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 69 | click | css=.cdk-focused > .mat-mdc-menu-item-text |
    await driver.findElement(By.css(".cdk-focused > .mat-mdc-menu-item-text")).click()
    // 70 | mouseOut | css=.mat-mdc-menu-item:nth-child(2) > .mat-mdc-menu-item-text |
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    // 71 | mouseOver | css=.mdc-icon-button:nth-child(1) > .mat-icon |
    {
      const element = await driver.findElement(By.css(".mdc-icon-button:nth-child(1) > .mat-icon"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 72 | click | css=.cdk-focused > .mat-icon |
    await driver.findElement(By.css(".cdk-focused > .mat-icon")).click()
    // 73 | mouseOut | css=.cdk-focused > .mat-icon |
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    // 74 | type | id=color-picker | #8d1b1b
    await driver.findElement(By.id("color-picker")).sendKeys("#8d1b1b")
    // 75 | click | css=.mat-drawer-content |
    await driver.findElement(By.css(".mat-drawer-content")).click()
  })
})
