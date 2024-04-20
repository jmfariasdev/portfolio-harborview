import UISelector from '../utils/UISelector'
import { MenuController } from '../utils/MenuController'

class MobileMenu extends MenuController {

  static instance: MobileMenu | null = null

  public static getInstance(): MobileMenu {
    if (!MobileMenu.instance) {
      MobileMenu.instance = new MobileMenu()
    }

    return MobileMenu.instance
  }

  // DOM
  protected MenuElement = UISelector.select<HTMLDivElement>('#mb-menu')
  protected ToggleElement = UISelector.select<HTMLButtonElement>('#mb-menu-btn')
  protected CloseElement = UISelector.select<HTMLButtonElement>('#close-btn')

  private constructor() {
    // Other event type can be specified as an
    // argument of super. The default is click event.
    super()
  }
}

export default MobileMenu.getInstance()
