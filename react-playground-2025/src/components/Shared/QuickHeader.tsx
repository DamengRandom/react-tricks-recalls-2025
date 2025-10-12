import { Link } from "react-router-dom";

const QuickHeader = () => {
  return (
    <>
      <h5>Quick Header</h5>
      <div>
        <Link to="/">Home</Link> |
        <Link to="/about">About</Link> |
        <Link to="/use-effect">Use Effect</Link> |
        <Link to="/settings">Settings</Link> |
        <Link to="/qa">QA</Link> |
        <Link to="/gigs">Gigs</Link>
      </div>
    </>
  );
};

export default QuickHeader;
