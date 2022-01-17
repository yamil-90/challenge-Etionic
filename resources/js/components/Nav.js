import { Link } from "react-router-dom";

const Nav= () => {
  return (
    <div>
      <nav>
        <Link  to="/home">Home</Link> |{" "}
        <Link to="/my-favorites">Favorites</Link>
      </nav>
    </div>
  );
}
export default Nav;
