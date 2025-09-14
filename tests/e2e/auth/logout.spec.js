import { test, expect } from "@playwright/test";

test.describe("User Logout", () => {
  test("should logout and return to index page", async ({ page }) => {
    // Precondition: logged in
    await page.goto("/index.html");
    await page.fill("#loginEmail", "testuser@example.com");
    await page.fill("#loginPassword", "mypassword123");
    await page.click("#loginForm button");

    await expect(page).toHaveURL(/.*dashboard(\.html)?$/);

    // Logout
    await page.click("#logoutBtn");

    await expect(page).toHaveURL(/(index\.html)?$/);
  });
});
