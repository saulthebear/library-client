import { useId } from "react"
import { Book as BookType } from "../types/book"
import { BookCard } from "./BookCard"

type Props = {
  books: BookType[]
}

export function Books({ books }: Props) {
  const id = useId()
  const bookComponents = books.map((book) => {
    return (
      <div key={`${id}-${book._id}`}>
        <BookCard {...book} />
      </div>
    )
  })
  return (
    <div>
      <h1 className="text-2xl font-bold ml-5 mb-3">All Books</h1>
      {bookComponents}
    </div>
  )
}
