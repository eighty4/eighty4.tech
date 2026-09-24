import { test, expect } from '@playwright/test'

test('root /${project} links to page', { tag: '@root' }, async ({ page }) => {
    await page.goto('/modern-lang')
    await expect(page.getByText('Mook')).toBeVisible()
    await page.getByText('Mook').click()
    await expect(page).toHaveURL('/modern-lang/quips/mook')
    await expect(page.getByText('Mook')).toHaveClass('current')
})

test('subpath / links to page', { tag: '@subpath' }, async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Mook')).toBeVisible()
    await page.getByText('Mook').click()
    await expect(page).toHaveURL('/quips/mook')
    await expect(page.getByText('Mook')).toHaveClass('current')
})
