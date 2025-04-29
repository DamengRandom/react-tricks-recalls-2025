# React Debug Tools

## 1. React Developer Tools

### How to install

```markdown
Download the extension from the link below:

- [React Developer Tools](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

- Don't foget to use flat chart, recording functionalities to monitoring your components how performance could get measured
```

### How to use

```markdown
- Don't forget to tick highlight render checkbox to enable re-render highlighting functionality for checking re-renders (this is under Profiler tab).

- For the Profiler tab, we also can track the components takes how long for rendering process.

- For the Components tab, which represents the component tree, you can click on a component to inspect it.
```

## 2. React Scan

### Link

- [React Scan](https://react-scan.com/)

### Install

```bash
npm install react-scan
```

### Usage

Check above link for more details on how to use it.

## 3. VSCode / Cursor Debugger

### How

```javascript
// Step 1: Find Run and Debug option

// Step 2: Change the localhost port number 
// Eg: http://localhost:5173
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}"
    }
  ]
}

// Step 3: Setup a debugger breakpoint at the code you want to debug
// Eg:

function UseStatePassAsFn() {
  const { count, increment, decrement } = useCount();
  console.log('count', count);
  
  debugger; // we can easily set up a breakpoint here

  return (
    <>
      <button type="button" onClick={increment}>Increment</button>
      <button type="button" onClick={decrement}>Decrement</button>
      <p>Count: {count}</p>
    </>
  );
}
```
