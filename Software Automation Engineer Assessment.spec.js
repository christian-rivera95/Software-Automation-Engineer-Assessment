const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {

  await page.goto('https://practicetestautomation.com/practice-test-login/'); //Command to go to sepecified test URL
  await expect(page.locator("#main-container")).toBeVisible() //Assertion to wait until content is loaded, before doing any actions

});

//Tests for the login page for practicetestautomation.com/practice-test-login
// QA Notes/Suggestions for developer:
  //Error message reveals username an password vulnerability
  //Implement Captcha/reCaptcha strategy to prevent DDos or bot attacks
  //Hide Login Endpoint
  
//QA Notes:
  //Make file containing all locators and logic to prevent repeated code
  //Make config file for testing different environments (DEV, STG, PRD)
  //Maje JSON file to import login credentials
  
test('Test 1: Positive LogIn Test', async ({ page }) => {

  await page.locator("#username").fill("student") //Locator for the username textbox

  await page.locator("#password").fill("Password123") //Locator for the password textbox

  await page.locator("#submit").click() //Locator for the submit/login button

  //Assertions
  await expect(page.url()).toBe("https://practicetestautomation.com/logged-in-successfully/") //Asserts if the url is what is specified in the argument
  await expect(await page.getByText("You successfully logged in")).toBeVisible() //Asserts that the login success message is visible
  await expect(page.getByRole('link', { name: "Log out"})).toBeVisible() //Asserts if the logout button is visible
 
});

test("Test 2: Negative Username Test", async ({ page }) => {
  
  await page.locator("#username").fill("incorrectUser") //Input an invalid user
  await page.locator("#password").fill("Password123")

  await page.locator("#submit").click()

  //Assertions
  await expect(page.locator("#error")).toBeVisible() //Asserts if the error message is visible
  await expect(page.locator("#error")).toContainText("Your username is invalid!") //Asserts if the error message contains the specified text

})


test("Test 3: Negative Password Test", async ({ page }) => {
  
  await page.locator("#username").fill("student")
  await page.locator("#password").fill("invalidpassword") //Input an invalid password

  await page.locator("#submit").click()

  //Assertions
  await expect(page.locator("#error")).toBeVisible()
  await expect(page.locator("#error")).toContainText("Your password is invalid!")
})


