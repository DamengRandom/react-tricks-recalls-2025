import isFunction from "./isFunction";

export default function isFunctionalComponent(virtualDOM) {
  const type = virtualDOM.type;

  return type && isFunction(virtualDOM) &&!(type.prototype && type.prototype.render);
  // must have type and type itself is a function and also type prototype must not have render function, then its treated as functional component
}
