// createElement: used for creating virtual dom objects ~

// Babel will read the JSX code (eg: virtualDOM/ modifiedDOM inside index.js file) and then transform the JSX element into TinyReact.createElement based javascript object !!!!!!!!! 
// Above explanation explained why we need createElement function !!!!!

// More accurately, this is createJSXElement !!! After this function added under TinyReact object, we can use TinyReact.createElement for build up the virtual DOM tree with elements !!!
export default function createElement(type, props, ...children) {
  // Just demo how to convert textContent into a JSX element
  const childElements = [].concat(children).reduce((result, child) => {
    if (child !== false && child !== true && child !== null) {
      if (child instanceof Object) {
        result.push(child);
      } else {
        result.push(createElement('text', { textContent: child }));
      }
    }

    return result;
  }, []);

  return { type, props: Object.assign({ children: childElements }, props), children: childElements };
}
