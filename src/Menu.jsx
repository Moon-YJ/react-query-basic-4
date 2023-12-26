import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <ul className="Menu">
      <li>
        <Link to="/">Main</Link>
      </li>
      <li>
        <Link to="/name">User Name</Link>
      </li>
      <li>
        <Link to="/address">User Address</Link>
      </li>
    </ul>
  );
}
