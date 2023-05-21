import {expect, test} from '@playwright/test'

test('index page has expected h1', async ({page}) => {
    await page.goto('/')
    const h1 = await page.$('h1')
    await expect(await h1?.innerText()).toEqual('Welcome to your library project')
})
