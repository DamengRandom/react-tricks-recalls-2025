import mountNativeElement from "./mountNativeElement";
import isFunction from "./isFunction";
import mountComponent from './mountComponent';

export default function mountElement(virtualDOM, container) {
  // check whether its a component or nativeElement (JSX elemenet)?
  if (isFunction(virtualDOM)) {
    // its component
    mountComponent(virtualDOM, container);
  } else {
    // its native element
    mountNativeElement(virtualDOM, container);
  }
}
