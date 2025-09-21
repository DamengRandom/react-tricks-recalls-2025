import mountElement from './mountElement';
import updateNodeElement from './updateNodeElement';

export default function createDOMElement(virtualDOM) {
  let newElement = null;

  if (virtualDOM.type === 'text') {
    // text nodes
    newElement = document.createTextNode(virtualDOM.props.textContent);
  } else {
    // element nodes
    newElement = document.createElement(virtualDOM.type);
    updateNodeElement(newElement, virtualDOM); // add props for the v-dom elements
  }

  // add a mirror of virtual dom after newELement created ~
  newElement._virtualDOM = virtualDOM;

  // iterate to cretae children elements
  virtualDOM.children.forEach(child => {
    mountElement(child, newElement);
    // The reason why not using mountNativeElement function here is because we don't know the child is a component or a native element, tahst why we need mountELement help to do teh check ~
  });

  return newElement;
}
