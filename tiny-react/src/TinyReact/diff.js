import createDOMElement from './createDOMElement';
import mountElement from './mountElement';
import updateNodeElement from './updateNodeElement';
import updateTextNode from './updateTextNode';

export default function diff(virtualDOM, container, oldDOM) {
  // get old virtual DOM if oldDOM exists
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM;
  // check if oldDOM exists
  if (!oldDOM) {
    // convert v-dom to real dom for browser to read
    mountElement(virtualDOM, container);
  } else if (virtualDOM.type !== oldVirtualDOM.type && virtualDOM.type !== 'function') {
    // different types, no need compare, just replace with the new Virtual DOM elements ~
    const newDOMElement = createDOMElement(virtualDOM);
    // replace oldDOM with newDOMElement
    oldDOM.parentNode.replaceChild(newDOMElement, oldDOM);
  } else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
    if (virtualDOM.type === "text") {
      // if its a text type, update the textContent
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM);
      // compare virtualDOM with oldVirtualDOM and find the difference, and then update the difference part for the oldDOM, which then will become a newDOM element (after updated) 
    } else {
      // if its a node type, then replace old element props with new element props for that node element
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM);
    }
    // update children virtual dom elements text typed elements
    virtualDOM.children.forEach((child, index) => {
      // child virtual DOM
      // second param: oldDOM is the child `PARENT`, which refers to container, can treat oldDOM as parent of child dom element (which is container)
      // third param: oldDOM.childNodes[index] is the child's oldDOM
      diff(child, oldDOM, oldDOM.childNodes[index]);
      // The order is 
      // - same level compare
      // - depth first compare
    });
  }
  // else case need to `COMPARE` new and old virtual DOM elements and updates the related changes
}
