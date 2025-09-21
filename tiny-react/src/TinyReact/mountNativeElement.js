import createDOMElement from './createDOMElement';

export default function mountNativeElement(virtualDOM, container) {
  let newElement = createDOMElement(virtualDOM);
  
  container.appendChild(newElement); // add converted JSX elements into a real DOM element !!!!
}