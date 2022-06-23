import { useEffect, useState } from "react"
import { Book } from "../../types/book"
import { Books } from "../Books"
import { Search } from "../SearchBar"

const fetchBooks = async () => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/books`
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.warn("Error fetching books: ", error)
    return []
  }
}

export function Home() {
  const [books, setBooks] = useState<Book[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books)
  const [error, setError] = useState<String>("")
  const [isLoading, setIsLoading] = useState<Boolean>()

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      setError("")
      const fetchedBooks = await fetchBooks()
      if (fetchedBooks.length > 0) {
        setBooks(fetchedBooks)
        setFilteredBooks(fetchedBooks)
        setIsLoading(false)
        return
      }
      setIsLoading(false)
      setError("No books found")
    })()
  }, [])

  let content
  if (isLoading) {
    content = <div>Loading...</div>
  } else if (error) {
    content = <div>{error}</div>
  } else {
    content = (
      <div className="flex justify-center">
        <div className="md:min-w-[500px]">
          {" "}
          <h1 className="text-2xl font-bold ml-5 mb-3">All Books</h1>{" "}
          <Books books={filteredBooks} />
        </div>
      </div>
    )
  }

  return (
    <div>
      <Search books={books} setBooks={setFilteredBooks} />
      {content}
    </div>
  )
}
