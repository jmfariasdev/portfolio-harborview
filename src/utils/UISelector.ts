/*
  - Better error handling when selecting DOM html elements.
*/
class UISelector {
  
  static instance: UISelector | null = null;

  public static getInstance(): UISelector {
    if (!UISelector.instance) {
      UISelector.instance = new UISelector()
    }
    return UISelector.instance
  }

  /*
    - Selects a DOM element by [ class ] e.g. '.myElement'
      or [ id ] e.g. '#myElement' and returns it, if found any.
  */
  select<T extends HTMLElement = HTMLElement>(query: string): T {
    if (!query || typeof query !== 'string') {
      throw new Error('Query parameter missing. HTMLElement query failed.')
    }
    if (!query.startsWith('.') && !query.startsWith('#')) {
      throw new Error('Invalid query parameter. Query must target by class with (.) or id with (#).') 
    }

    const element: T | null = document.querySelector(query)

    if (!element) throw new Error(`No HTMLElement was found with the query ${query}.`)

    if (!(element instanceof HTMLElement)) {
      throw new Error('Query failed. Target element does not match the expected html type.')
    }
    
    return element
  }
  
  /*
    - Selects a list of DOM elements by [ class ] e.g. '.myElement'
      or [ id ] e.g. '#myElement' and returns it, if found any.
  */
  selectAll<T extends HTMLElement = HTMLElement>(query: string): NodeListOf<T> {
    if (!query || typeof query !== 'string') {
      throw new Error('Query parameter missing. Query failed.')
    }
    if (!query.startsWith('.') && !query.startsWith('#')) {
      throw new Error('Invalid query parameter. Query must target by class with (.) or id with (#).') 
    }

    const elements: NodeListOf<T> | null = document.querySelectorAll(query)

    if (!elements.length) {
      throw new Error(`No elemements were found with the query of ${query}`)
    }

    for (const element of elements) {
      if (!(element instanceof HTMLElement)) {
        throw new Error('Query failed. One or more elements does not match expected html type.')
      }
    }

    return elements
  }
}

export default UISelector.getInstance()
