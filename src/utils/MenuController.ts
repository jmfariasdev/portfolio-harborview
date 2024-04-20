export enum State {
  OPEN = 'open',
  CLOSED = 'closed'
}

export const defaultAttrName: string = 'data-state'

export abstract class MenuController {
  
  protected abstract MenuElement: HTMLDivElement
  protected abstract ToggleElement: HTMLButtonElement
  protected abstract CloseElement: HTMLButtonElement | null

  public currentState: State = State.CLOSED /* default state */
  
  protected constructor(public eventType: keyof HTMLElementEventMap = 'click') {}
  
  private listener = (): void => {
    // Prevent ToggleElement from closing the menu
    // if there's other element responsible for that.
    if (this.currentState == State.OPEN && this.CloseElement) return
    
    this.toggle()
  }

  toggle = (): void => {
    this.currentState = this.currentState == State.CLOSED ? State.OPEN : State.CLOSED
    this.MenuElement.setAttribute(defaultAttrName, this.currentState)
  }

  enable(): void {
    this.ToggleElement.addEventListener(this.eventType, this.listener)

    if (this.CloseElement) {
      this.CloseElement.addEventListener(this.eventType, this.toggle)
    }
  }
  
  disable(): void {
    this.ToggleElement.removeEventListener(this.eventType, this.listener)

    if (this.CloseElement) {
      this.CloseElement.removeEventListener(this.eventType, this.toggle)
    }
  }
}
