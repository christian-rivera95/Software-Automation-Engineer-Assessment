package logInTest;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.TimeoutError;
import com.microsoft.playwright.options.AriaRole;

import io.qameta.allure.Owner;
import io.qameta.allure.Severity;
import io.qameta.allure.SeverityLevel;
import io.qameta.allure.Step;
import logInTest.BasePage;


@Owner("Jenisse Navas")
@Severity(SeverityLevel.CRITICAL)
public class BasePage {
	
	String usernameErrorMess = "Your username is invalid!";
	String passErrorMess = "Your password is invalid!";
	String urlHomePage = "https://practicetestautomation.com/logged-in-successfully/";
	String loggedIntext = "Logged In Successfully";
	String congratsText = "Congratulations student. You successfully logged in!";
	String logOutText = "Log out";
	Page page =null;
	
	
	public BasePage(Page page) {
		this.page = page;
	}

	
	@Step("Open the login page.")
	public Page openLogInPage() {
		page.navigate("https://practicetestautomation.com/practice-test-login/");
		return page;
	}
	
	
	@Step("Enter the username into the Username field.")
	public Page enterUsername( String usernameInput) {
		try {
			page.getByLabel("Username").fill(usernameInput);
		} catch (TimeoutError e) {
			System.out.println("Timeout!");
		}
		return page;
	}
	
	@Step("Enter the password into the Password field.")
	public Page enterPassword(String passwordInput) {
		try {
			page.getByLabel("Password").fill(passwordInput);
		} catch (TimeoutError e) {
			System.out.println("Timeout!");
		}
		return page;
	}
	
	
	@Step("Click the Submit button.")
	public Page clickOnSubmitButton( String submitButton) {
		try {
			page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName(submitButton)).click();
		} catch (TimeoutError e) {
			System.out.println("Timeout!");
		}
		return page;
	}
	
	
	@Step("The new URL is: https://practicetestautomation.com/logged-in-successfully/\".\r\n"
			+ "The page contain the text \"Congratulations\" and \"successfully logged in\".\r\n"
			+ "The \"Logout\" button is displayed on the new page.\r\n"
			+ "")
	public void verifySuccesfullyLoggedIn() {
		assertThat(page).hasURL(urlHomePage);
		assertThat(page.getByText(loggedIntext)).isVisible();
		assertThat(page.getByText(congratsText)).isVisible();
		assertThat(page.getByText(logOutText)).isVisible();	
	}

	

	@Step("The error message is displayed indicating Your username is invalid!")
	public void verifyMessageForInvalidUser() {
		assertThat(page.locator("b").filter(new Locator.FilterOptions().setHasText("Your username is invalid!"))).isVisible();	
	}
	

	@Step("The error message is displayed indicating Your password is invalid!")
	public void verifyMessageForInvaliPassword() {
		assertThat(page.locator("b").filter(new Locator.FilterOptions().setHasText("Your password is invalid!"))).isVisible();
	}
	
}
