import TinyReact from './TinyReact';

const vituralDOM = (
  <div className='container'>
    <h1>Hi Tiny React</h1>
    <h2 data-testid="test id">Test for tiny react</h2>
    <div>
      Nested element demo
      <div>Inner nested element 1.1</div>
    </div>
    <h3>Using TinyReact.createElement to build Virtual DOM tree</h3>
    {2 === 1 && <div>If 2 === 1, render this DOM element</div>}
    {2 === 2 && <div>virtual for 2</div>}
    <span>This is span text element</span>
    <button onClick={() => alert('Aloha ~')}>Click me</button>
    <h3>This will be deleted eventually</h3>
    2, 3
    <input type="text" value="3" />
  </div>
);

const modifiedDOM = (
  <div className='container'>
    <h1>Hi Tiny React</h1>
    <h2 data-testid="test id 123 updated">Test for tiny react</h2>
    <div>
      Nested element demo
      <div>Inner nested element 1.1</div>
    </div>
    <h3>Using TinyReact.createElement to build Virtual DOM tree</h3>
    {2 === 1 && <div>If 2 === 1, render this DOM element</div>}
    {2 === 2 && <div>virtual for 2</div>}
    <span>This is span text element</span>
    <button onClick={() => alert('Aloha updated ~')}>Click me</button>
    <h6>This will be deleted eventually - updated</h6>
    2, 3
    <input type="text" value="31" />
  </div>
);

const rootElement = document.getElementById('root');

TinyReact.render(vituralDOM, rootElement);

setTimeout(() => {
  TinyReact.render(modifiedDOM, rootElement);
}, 2000);
// console.log("How Vitural DOM looks like now 🏕🏕🏕? ", vituralDOM);

// Functional component render demo:
// function Demo() {
//   return <div>Aloha from demo~~</div>
// }
// function Heart(props) { // functional component for rendering
//   return <div>
//     <p>{props.title} - &hearts;</p>
//     <Demo />
//   </div>
// }

// TinyReact.render(<Heart title="Heart title" />, rootElement);

// Class component render demo:
// class Alert extends TinyReact.Component {
//   constructor(props) {
//     super(props); // ALert class inherits props from TinyReact.Component class !!
//   }

//   render() {
//     return <div>"Class" compoennt demo - {this.props.name}: {this.props.purpose}</div>
//   }
// }

// TinyReact.render(<Alert name="Damon" purpose="Write tiny react to understand Virtual DOM in better way" />, rootElement);
