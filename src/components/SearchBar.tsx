import { useEffect, useState } from "react"
import { Book } from "../types/book"

type Props = {
  books: Book[]
  setBooks: (books: Book[]) => void
}

export function Search({ books, setBooks }: Props) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value ? e.target.value.toLowerCase() : "")
  }

  useEffect(() => {
    if (searchTerm === "") {
      setBooks(books)
    } else {
      const filteredBooks: Book[] = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setBooks(filteredBooks)
    }
  }, [searchTerm, books, setBooks])

  return (
    <div className="p-5 w-full flex justify-center">
      <div className="flex">
        <input
          type="text"
          className="py-2 px-3 rounded-l shadow-inner"
          placeholder="Filter by title"
          aria-label="Filter books by title"
          value={searchTerm}
          onChange={handleChange}
        />
        <button className="bg-blue-700 text-white rounded-r px-5 py-1 font-semibold">
          Search
        </button>
      </div>
    </div>
  )
}
