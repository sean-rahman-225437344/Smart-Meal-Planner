import { test, expect } from "@playwright/test";

test.describe("User Login", () => {
  test("should login with valid credentials", async ({ page }) => {
    await page.goto("/index.html");

    await page.fill("#loginEmail", "testuser@example.com");
    await page.fill("#loginPassword", "mypassword123");

    await page.click("#loginForm button");

    await expect(page).toHaveURL(/.*dashboard(\.html)?$/);
    await expect(page.locator("#welcomeMsg")).toBeVisible();
  });

  test("should fail login with wrong password", async ({ page }) => {
    await page.goto("/index.html");

    await page.fill("#loginEmail", "testuser@example.com");
    await page.fill("#loginPassword", "wrongpass");

    await page.click("#loginForm button");

    // Check for alert dialog
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Login failed");
      await dialog.dismiss();
    });
  });
});
