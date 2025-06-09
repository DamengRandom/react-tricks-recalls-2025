# React Router


## What is React Router?

React Router is a library which is fundenmentally built on top of HTML5 history API, which enables client side routing without page reloads. 

### HTML5 history APIs

Eg: window.history.pushState(state, title, url)

- state: a javascript object associated with the new history entry
- title: (ignored in most browsers)
- url: the new url (must be same origin as the current url)

```js
window.history.pushState(null, "", "/home");
```

How React router use these mechanisms?

<BrowserRouter>: create centralized history object, setup event listeners for popstate (back/forward navigation)

When user clicked <Link> button, prevents default browser navigation, and calls `history.pushState()` with the new url to update the url.

Then notify all subscribers (Router) of location change.

React router re-render the new location matching routes.

When user click `back` button, will trigger `popstate` event, and React router will re-render the previous location matching routes.

For the dynamic segaments, eg: `/users:id`, will use `useParams()` to get the id, and update the url change.

### How to use React Router, example:

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</BrowserRouter>
```
