export default function updateNodeElement(newElement, virtualDOM, oldVirtualDOM = {}) {
  // get props object
  const newProps = virtualDOM.props || {};
  // get old dom props
  const oldProps = oldVirtualDOM.props || {};

  Object.keys(newProps).forEach((propName) => {
    const newPropsValue = newProps[propName];
    const oldPropsValue = oldProps[propName];

    if (newPropsValue !== oldPropsValue) {
      // check whether its an event prop or not
      if (propName.slice(0, 2) === 'on') {
        const eventName = propName.toLowerCase().slice(2);
        // add event listener
        newElement.addEventListener(eventName, newPropsValue);

        if (oldPropsValue) {
          // remove old event listener
          newElement.removeEventListener(eventName, oldPropsValue);
        }
      } else if (propName === "value" || propName === "checked") {
        newElement[propName] = newPropsValue;
      } else if (propName !== "children") {
        if (propName === "className") {
          newElement.setAttribute("class", newPropsValue);
        } else {
          newElement.setAttribute(propName, newPropsValue);
        }
      }
    }
  });

  // Case: check whether props have been deleted, delete DOM related props if DOM element(s) have been deleted
  Object.keys(oldProps).forEach((propName) => {
    const newPropsValue = newProps[propName];
    const oldPropsValue = oldProps[propName];

    if (!newPropsValue) {
      // prop has been deleted, remove it from dom element
      if (propName.slice(0, 2) === 'on') {
        const eventName = propName.toLowerCase().slice(2);
        // remove event listener
        newElement.removeEventListener(eventName, oldPropsValue);
      } else if (propName !== 'children') {
        newElement.removeAttribute(propName);
      }
    }
  })
}
