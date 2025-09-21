import diff from './diff';

export default function render(virtualDOM, container, oldDOM = container.firstChild) { // container.firstChild is like <div id="root"></div>, the first child after id="root" div element
  diff(virtualDOM, container, oldDOM); // compare v-dom elements
}
