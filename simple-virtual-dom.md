# Implement simple mock Virtual DOM

- This notes is mainly focus on how to implement a simple mock virtual DOM, which is for knwoledge recall about how React Vitural DOM works

## JSX Understanding

- JSX is a syntax extension for JavaScript that looks similar to XML or HTML. It is used to describe the structure of a user interface in React.

- It's used for creating Virtual DOM by creating the JSX React elements (Convert all JSX virtual DOM objects into JS objects for browser to read)
  - React JSX elements -> React.createElement (via Babel) -> show virtual DOM -> convert virtual DOM to real DOM (via React) -> display in browser as real DOM elements

- Before running React code, Browser uses Babel to transform JSX into regular JavaScript function calls.

```tsx
<div id="container">
  <p>JSX Quick Demo - memo for createElement 3 params: type, props and children elements</p>
</div>
// After Babel transform, the above JSX code will be transformed into the following JavaScript code:
React.createElement(
  'div',
  { id: 'container' },
  React.createElement(
    'p',
    null,
    'JSX Quick Demo - memo for createElement 3 params: type, props and children elements'
  )
)
```

## Virtual DOM

### Understandings

- Virtual DOM is a mirror of a real DOM which is used for representing current DOM tree, how it looks like

- React will update the virtual DOM first then update the Real DOM, evetually browser will read the real dom and update the UI for showing to the users

- Key principle: React `compares` virtual DOM objects and find the `difference` and then `only update` the `different` virtual DOM elements instead of traverse the whole DOM tree and do the update (which is inefficient for DOM updates process -> means slow)

```tsx
// Virtual DOM example
// type, props and children !!!
{
  type: 'div',
  props: {
    id: 'container'
  },
  children: [
    {
      text: 'p',
      props: null,
      children: [
        {
          type: 'text',
          props: {
            textContent: 'JSX Quick Demo - memo for createElement 3 params: type, props and children elements'
          }
        }
      ]
    }
  ]
}
```

### Create Vritual DOM mock

- Run [TinyReact](https://github.com/damengrandom/react/tiny-react) project (Its an independent micro-project for knowledge recall on how React works under the hood ~)
