# What are controlled and uncontrolled components?

## Answer:

- Controlled: Form data is handled by React state.

- Uncontrolled: Form data is handled by the DOM (using ref).

## Controlled Example:

```jsx
function Form() {
  const [value, setValue] = useState("");
  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}
```

## Uncontrolled Example:

```jsx
function Form() {
  const inputRef = useRef();
  return <input ref={inputRef} />;
}
```
