import { Link } from "react-router-dom"
import { Book } from "../types/book"
import { Availability } from "./Availability"
import Genres from "./Genres"

export function BookCard({ title, isCheckedOut, genres, _id, author }: Book) {
  return (
    <div className="grid px-4">
      <div className="bg-white shadow-md mb-4 p-4 rounded-xl">
        <Link to={`/books/${_id}`}>
          <div className="mb-3">
            <p className="font-bold text-xl">{title}</p>
            <p className="ml-2">{author}</p>
          </div>
          <div className="flex flex-wrap gap-1 items-center ml-2">
            <Availability isCheckedOut={isCheckedOut} />
            <Genres genres={genres} />
          </div>
        </Link>
      </div>
    </div>
  )
}
