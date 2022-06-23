import { Link } from "react-router-dom"
import { Book } from "../types/book"
import { Availability } from "./Availability"
import Genres from "./Genres"

export function BookCard({ title, isCheckedOut, genres, _id }: Book) {
  return (
    <div className="grid md:grid-cols-2 px-4">
      <div className="bg-white shadow-md mb-2 p-4 rounded-xl">
        <Link to={`/books/${_id}`}>
          <p className="font-bold text-xl mb-2">{title}</p>
          <div className="flex flex-wrap gap-1 items-center ml-2">
            <Availability isCheckedOut={isCheckedOut} />
            <Genres genres={genres} />
          </div>
        </Link>
      </div>
    </div>
  )
}
