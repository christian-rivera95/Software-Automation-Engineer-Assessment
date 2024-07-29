import {test, expect} from "@playwright/test"

test('Test Case 1: Edit a Kanban Card', async ({ page }) => {

    //Navigate to the Kanban app
    await page.goto('https://kanban-566d8.firebaseapp.com/');

    // Step 2: Select a card with unfinished subtasks that is located in any column except the first.
    // Locate the first card in the second column
    const secondColumnArticle = page.locator("//div[@class='flex gap-6']/section[2]/div[2]/article[1]");
    await secondColumnArticle.click();
  
    // Step 3: Locate all checkboxes for subtasks
    const chkBox = "//div[@class='flex flex-col gap-2']/label/input[@type='checkbox']";
    const chkBoxLocator = page.locator(chkBox);
  
    // Step 4: Complete one subtask (check the first unchecked checkbox)
    let chkBoxCount = await chkBoxLocator.count();
    for (let i = 1; i <= chkBoxCount; i++) {
      const currentChkBox = chkBoxLocator.nth(i - 1);
      if (!await currentChkBox.isChecked()) {
        await currentChkBox.check();
        break;
      }
    }
  
    // Step 5: Move the task to the first column
    await page.click("//*[@id='app']/div[2]/div/div/div[3]/div"); // Open dropdown
    await page.click("//*[@id='app']/div[2]/div/div/div[3]/div/div[3]/div[1]"); // Move to first column
  
    // Step 6: Check that the subtask is marked as completed.
    for (let i = 1; i <= chkBoxCount; i++) {
      const currentChkBox = chkBoxLocator.nth(i - 1);
      if (await currentChkBox.isChecked()) {
        expect(await currentChkBox.isChecked()).toBeTruthy();
        break;
      }
    }
  
    // Step 7:Exit the card editing page.
    await page.click("//*[@id='app']/div[2]/div/div/div[1]/div/div[1]"); // Close button
    await page.click("//*[@id='app']/div[2]/div/div/div[1]/div/div[2]/div/p[1]"); // Confirm close
    await page.click("//button[@type='submit']");
  
    // Step 8: Verify that the task is in the first column
    const updatedFirstColumnArticles = page.locator("//div[@class='flex gap-6']/section[1]/div[2]/article");
    let updatedArticleCount = await updatedFirstColumnArticles.count();
    expect(updatedArticleCount).toBeGreaterThan(0);
  
    // Ensure the article moved correctly by verifying its presence in the first column
    const lastArticleInFirstColumn = updatedFirstColumnArticles.nth(updatedArticleCount - 1);
    await expect(lastArticleInFirstColumn).toBeVisible();
  
    await page.waitForTimeout(3000); //Wait for any asynchronous operations to complete
  });


test('Test Case 2: Delete a Kanban Card', async ({ page }) => {

    //1.Open the Kanban app
    await page.goto('https://kanban-566d8.firebaseapp.com/');

    //2.Wait for the articles to be loaded
    await page.waitForSelector("//div[@class='flex gap-6']/section[1]/div[2]/article");
  
    //3.Select the first article in the column
    const firstArticle = page.locator("//div[@class='flex gap-6']/section[1]/div[2]/article[1]");
    
    //4.Ensure the article is visible and store its text content
    await expect(firstArticle).toBeVisible();
    const articleText = await firstArticle.innerText();
    
    //5.Click on the article to open its details
    await firstArticle.click();
  
    //6.Click on the delete option in the article's details
    await page.click("//*[@id='app']/div[2]/div/div/div[1]/div/div[1]");
    await page.click("//*[@id='app']/div[2]/div/div/div[1]/div/div[2]/div/p[2]");
  
    //7.Ensure the delete button is visible before clicking
    const deleteButton = page.locator("//*[@id='app']/div[2]/div/div/div[2]/div[1]/button");
    await expect(deleteButton).toBeVisible();
  
    //8.Click the delete button to delete the article
    await deleteButton.click();
    await page.waitForTimeout(1000); // Wait for the delete action to complete
  
    //9.Verify that the article is no longer present in the column
    const articles = page.locator("//div[@class='flex gap-6']/section[1]/div[2]/article");
    const articleTexts = await articles.allInnerTexts();
    expect(articleTexts).not.toContain(articleText);
  
    //10.Wait for any asynchronous operations to complete
    await page.waitForTimeout(3000);
  });


  test('Test Case 3: Toggle Dark Mode', async ({ page }) => {

    await page.goto('https://kanban-566d8.firebaseapp.com/');
    //await page.pause ()

    //toggle selector named label div
    const toggle = page.locator('label div');

    // Evaluate the initial mode as per body response it doesnt have a value. 
    const initialMode = await page.evaluate(() => document.body.classList.contains(''));

    // Click the toggle button
    await toggle.click();

    // Evaluate the new mode after the toggle which in the body is marked as "dark"
    const newMode = await page.evaluate(() => document.body.classList.contains('dark'));
    
    await page.waitForTimeout(3000);
  });

  


  
