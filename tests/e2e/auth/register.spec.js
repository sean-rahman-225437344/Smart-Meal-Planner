import { test, expect } from "@playwright/test";

test.describe("User Registration", () => {
  test("should register a new user and redirect to dashboard", async ({
    page,
  }) => {
    const uniqueEmail = `user_${Date.now()}@example.com`;

    await page.goto("/index.html");

    await page.fill("#regName", "Test User");
    await page.fill("#regEmail", uniqueEmail);
    await page.fill("#regPassword", "mypassword123");

    await page.click("#registerForm button");

    await expect(page).toHaveURL(/.*dashboard(\.html)?$/);
    await expect(page.locator("#welcomeMsg")).toBeVisible();
  });
});
