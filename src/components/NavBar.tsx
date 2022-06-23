import { Link } from "react-router-dom"

export function NavBar() {
  return (
    <div className="p-4">
      <ul className="flex flex-row justify-evenly gap-5">
        <li className="font-bold">
          <Link to="/">Home</Link>
        </li>
        <li className="font-bold">
          <Link to="/my-books">My Books</Link>
        </li>
        <li className="font-bold">
          <Link to="/add-book">Add Book</Link>
        </li>
      </ul>
    </div>
  )
}
