export default function updateTextNode(virtualDOM, oldVirtualDOM, oldDOM) {
  if (virtualDOM.props.textContent !== oldVirtualDOM.props.textContent) {
    oldDOM.textContent = virtualDOM.props.textContent; // this is how React update the text content (update the specofic DOM element)
    oldDOM._virtualDOM = virtualDOM; // update the virtual DOM element too for the Virtual DOM tree !!
  }
}