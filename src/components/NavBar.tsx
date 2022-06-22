import { Link } from "react-router-dom"

export function NavBar() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/my-books">My Books</Link>
        </li>
        <li>
          <Link to="/add-book">Add Book</Link>
        </li>
      </ul>
    </div>
  )
}
