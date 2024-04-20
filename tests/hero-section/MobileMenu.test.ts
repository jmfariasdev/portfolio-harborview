import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { fireEvent } from '@testing-library/dom'
import { Browser } from 'happy-dom'
import { html } from '../prod/prod-html'
import { defaultAttrName, State } from '../../src/utils/MenuController'


describe('MobileMenu', () => {
  it('is_hidden_by_default', async () => {
    const browser = new Browser()
    const page = browser.newPage()
    page.content = html

    const menu = page.mainFrame.document.querySelector('#mb-menu')
    expect(menu).not.toBeNull()
    expect(menu).not.toHaveAttribute('data-state')

    await browser.close()
  })

  it('opens_and_close_as_expected', async () => {
    const browser = new Browser()
    const page = browser.newPage()
    page.content = html
    
    const menu = page.mainFrame.document.querySelector('#mb-menu')
    const openBtn = page.mainFrame.document.querySelector('#mb-menu-btn')
    const closeBtn = page.mainFrame.document.querySelector('#close-btn')
    
    /* @ts-ignore */
    fireEvent.click(openBtn)
    
    expect(menu?.getAttribute(defaultAttrName)).toBe(State.OPEN)

    /* @ts-ignore */
    fireEvent.click(closeBtn)

    expect(menu?.getAttribute(defaultAttrName)).toBe(State.CLOSED)

    await browser.close()
  })
})
