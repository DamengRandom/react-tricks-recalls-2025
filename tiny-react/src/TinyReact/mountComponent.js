import isFunction from "./isFunction";
import isFunctionalComponent from "./isFunctionalComponent";
import mountNativeElement from "./mountNativeElement";

export default function mountComponent(virtualDOM, container) {
  // check whether its class or functional based component?
  let nextVirtualDOM = null;
  // If function has render function, its the class component, otherwise, its a functional component
  if (isFunctionalComponent(virtualDOM)) {
    // functional component
    nextVirtualDOM = buildFunctionComponent(virtualDOM);
    // console.log("Functional component render result: ", nextVirtualDOM);
  } else {
    // class component
    nextVirtualDOM = buildClassCompoent(virtualDOM);
  }

  // iterate check whether its a function or not, which is keep diving until its a function and then, return function related code
  if (isFunction(nextVirtualDOM)) {
    mountComponent(nextVirtualDOM, container);
  } else {
    mountNativeElement(nextVirtualDOM, container);
  }
}

function buildFunctionComponent(virtualDOM) {
  return virtualDOM.type(virtualDOM.props || {}); // passing virtualDOM.props into component and make compoennt able to read the props values ~
}

function buildClassCompoent(virtualDOM) {
  // we instantiate the class component and return the instance
  const compoenntInstance = new virtualDOM.type(virtualDOM.props || {}); // pass props into Compoennt class instance, and Consumer class (eg: Alert class) will be able to inherit the Component class instance props (eg: this.props)
  // return class instance render function which has all virtual DOM elements
  const nextVirtualDOM = compoenntInstance.render();
  // return render function eventually
  return nextVirtualDOM;
}
// As you can see, build class component (`buildClassCompoent`) is actually call class instance and then find the render function and call render function,
// And functional component (`buildFunctionComponent`), straight forward, which directly call function itself, which is less code execution, more efficient and faster (less code run)
