package logInTest;

import org.testng.annotations.Test;
import org.junit.jupiter.api.*;
import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

import com.microsoft.playwright.APIRequest.NewContextOptions;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import com.microsoft.playwright.assertions.LocatorAssertions;
import com.microsoft.playwright.options.AriaRole;

import io.qameta.allure.Description;
import io.qameta.allure.Owner;
import io.qameta.allure.Severity;
import io.qameta.allure.SeverityLevel;
import io.qameta.allure.Step;

@Owner("Jenisse Navas")
@Severity(SeverityLevel.CRITICAL)
public class TestLogin {

	Playwright playwright = null;
	Browser browser = null;
	Page page = null;;
	BasePage loginpage;
	String validUsername;
	String validPassword;
	String invalidUsername;
	String invalidPassword;
	String urlLoginPage;
	String submitButton;
	Boolean tc1;
	Boolean tc2;
	LocatorAssertions tc3;

	

	public TestLogin() {
		validUsername = "student";
		validPassword = "Password123";
		invalidUsername = "WrongUser";
		invalidPassword = "WrongPass";
		submitButton = "submit";
		urlLoginPage = "https://practicetestautomation.com/practice-test-login/";
	}

	@BeforeEach
	public Page setup() throws InterruptedException {
		// Start Playwright and launch the browser.
		playwright = Playwright.create();
		browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(false));
		page = browser.newPage();

		return page;
	}

	@Test
	@Description("Verify that the user can log in successfully with valid credentials.")
	public void checkLogInWithValidCredentials() throws InterruptedException {
		page = setup();
		loginpage = new BasePage(page);
		// Navigate into the login page https://practicetestautomation.com/practice-test-login/.
		page= loginpage.openLogInPage();
		// Enter valid username:student and password:Password123 and click the submit button.
		page= loginpage.enterUsername(validUsername);
		page= loginpage.enterPassword(validPassword);
		page= loginpage.clickOnSubmitButton(submitButton);
		// Verify the url of the new page, the successfully logged in and congratulation text is displayed.
		// Verify the log out button is displayed in the new page.
		loginpage.verifySuccesfullyLoggedIn();
		closeBrowser();
	}

	@Test
	@Description("Verify that an error message is displayed for an invalid username.")
	public void checkInvalidUsernameErrorMessage() throws InterruptedException {
		page = setup();
		loginpage = new BasePage(page);
		// Open the login page https://practicetestautomation.com/practice-test-login/.
		page= loginpage.openLogInPage();
		// Enter wrong username and valid password:Password123 and click the submit button.
		page= loginpage.enterUsername(invalidUsername);
		page= loginpage.enterPassword(validPassword);
		page= loginpage.clickOnSubmitButton(submitButton);
		// Verify the message displayed indicating Your username is invalid!.
		loginpage.verifyMessageForInvalidUser();;	
		closeBrowser();
	}

	@Test
	@Description("Verify that an error message is displayed for an invalid password.")
	public void checkInvalidPasswordErrorMessage() throws InterruptedException {
		page= setup();
		loginpage = new BasePage(page);
		// Open the login page https://practicetestautomation.com/practice-test-login/.
		page= loginpage.openLogInPage();
		// Enter valid username and incorrect password and click the submit button.
		page= loginpage.enterUsername(validUsername);
		page= loginpage.enterPassword(invalidPassword);
		page= loginpage.clickOnSubmitButton(submitButton);
		// Verify the message displayed indicating Your password is invalid!.
		loginpage.verifyMessageForInvaliPassword();
		closeBrowser();
	}
	
	public void closeBrowser() {
		browser.close();
		page.close();
		playwright.close();
	}

	
}
