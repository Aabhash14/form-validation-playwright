// tests/demoqa-form.spec.js
const { test, expect } = require('@playwright/test');

test('DemoQA automation practice form submits successfully', async ({ page }) => {
  await page.goto('https://demoqa.com/automation-practice-form', { waitUntil: 'domcontentloaded' });
  test.setTimeout(120_000);
  page.setDefaultTimeout(120_000);

  // Fill form
  await page.locator('#firstName').fill('Aabhash');
  await page.locator('#lastName').fill('Shahi');
  await page.locator('#userEmail').fill('aabhashshahi14@gmail.com');

  // Gender (Male) - strict-mode-proof
  await page.locator('label[for="gender-radio-1"]').click();

  // Mobile
  await page.locator('#userNumber').fill('9841234567');

  // Date of Birth
  const dob = page.locator('#dateOfBirthInput');
  await dob.click();
  await dob.press('Control+A');
  await dob.type('31 May 2001');
  await dob.press('Enter');

  // Subjects (Maths)
  const subjects = page.locator('#subjectsInput');
  await subjects.type('Maths');
  await subjects.press('Enter');

  // Hobbies (Sports) - strict-mode-proof
  await page.locator('label[for="hobbies-checkbox-1"]').click();

  // Upload picture (UPDATE THIS PATH to a valid file on your machine)
  const filePath = 'D:/Downloads/Me/aaa.png';
  await page.locator('#uploadPicture').setInputFiles(filePath);

  // Address
  await page.locator('#currentAddress').fill('Tinkune');

  // State & City (react-select)
  await page.locator('#state').click();
  await page.locator('#react-select-3-input').type('NCR');
  await page.locator('#react-select-3-input').press('Enter');

  await page.locator('#city').click();
  await page.locator('#react-select-4-input').type('Delhi');
  await page.locator('#react-select-4-input').press('Enter');

  // Submit (force click helps on DemoQA due to overlays)
  await page.locator('#submit').scrollIntoViewIfNeeded();
  await page.locator('#submit').click({ force: true });

  // Assert modal appears
  const modal = page.locator('.modal-content');
  await expect(modal).toBeVisible();

  // Assert title
  await expect(page.locator('#example-modal-sizes-title-lg'))
    .toHaveText('Thanks for submitting the form');

  // Assert key fields in the results table
  const table = page.locator('.table-responsive');

  await expect(table).toContainText('Student Name');
  await expect(table).toContainText('Aabhash Shahi');

  await expect(table).toContainText('Student Email');
  await expect(table).toContainText('aabhashshahi14@gmail.com');

  await expect(table).toContainText('Gender');
  await expect(table).toContainText('Male');

  await expect(table).toContainText('Mobile');
  await expect(table).toContainText('9841234567');

  await expect(table).toContainText('Date of Birth');
  // DemoQA formats it like "31 May,2001"
  await expect(table).toContainText('31 May,2001');

  await expect(table).toContainText('Subjects');
  await expect(table).toContainText('Maths');

  await expect(table).toContainText('Hobbies');
  await expect(table).toContainText('Sports');

  await expect(table).toContainText('Picture');
  await expect(table).toContainText('aaa.png');

  await expect(table).toContainText('Address');
  await expect(table).toContainText('Tinkune');

  await expect(table).toContainText('State and City');
  await expect(table).toContainText('NCR Delhi');

  // Close modal (optional)
  await page.locator('#closeLargeModal').click();
  await expect(modal).toBeHidden();
});
