import { test, expect } from '@playwright/test'

test('lists links to docs sites', { tag: '@root' }, async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('modern-lang')).toBeVisible()
    await page.getByText('modern-lang').click()
    await expect(page).toHaveURL('/modern-lang')
})
