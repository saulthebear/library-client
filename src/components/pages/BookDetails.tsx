import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Book } from "../../types/book"
import { Availability } from "../Availability"
import { BookForm } from "../BookForm"
import Genres from "../Genres"

const fetchBook = async (id: String) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/books/${id}`
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.warn("Error fetching book: ", error)
  }
}

export function BookDetails() {
  const [book, setBook] = useState<Book | null>(null)
  const [isEditing, setIsEditing] = useState<Boolean>(false)

  const navigate = useNavigate()

  const { id } = useParams()

  useEffect(() => {
    if (!id) return
    ;(async () => {
      const fetchedBook = await fetchBook(id)
      setBook(fetchedBook)
    })()
  }, [id])

  const handleCheckout = async () => {
    if (!book) return
    console.log("Checking out book: ", book)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/members/${process.env.REACT_APP_MEMBER_ID}/books/${id}`,
        { method: "POST" }
      )
      if (response.status >= 400) {
        console.log("Could not check out book: ", response)
        return
      }
      setBook({ ...book, isCheckedOut: true })
    } catch (error) {
      console.warn("Error checking out book: ", error)
    }
  }
  const handleReturn = async () => {
    if (!book) return
    console.log("Returning book: ", book)

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/members/${process.env.REACT_APP_MEMBER_ID}/books/${id}`,
        { method: "DELETE" }
      )
      if (response.status >= 400) {
        console.log("Could not return book: ", response)
        return
      }

      setBook({ ...book, isCheckedOut: false })
    } catch (error) {
      console.warn("Error returning book: ", error)
    }
  }

  const handleDelete = async () => {
    if (!book) return
    console.log("Deleting book: ", book)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/books/${id}`,
        { method: "DELETE" }
      )
      if (response.status >= 400) {
        console.log("Could not delete book: ", response)
        return
      }

      navigate("/")
    } catch (error) {
      console.warn("Error deleting book: ", error)
    }
  }

  return (
    <div>
      {!book && <p>Loading...</p>}
      {book && (
        <div className="p-5">
          <h1 className="text-3xl font-bold mb-3">{book.title}</h1>
          <div className="ml-5 space-y-3">
            <p className="text-lg font-semibold">Author: {book.author}</p>
            <div className="flex">
              <span className="mr-2 font-bold">Genres:</span>
              <span className="flex gap-2">
                <Genres genres={book.genres} />
              </span>
            </div>
            <div>
              <Availability isCheckedOut={book.isCheckedOut} />
            </div>
            <div className="flex gap-2">
              <button
                className="px-5 py-2 font-bold bg-yellow-500 rounded-md"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
              {isEditing && (
                <button
                  className="px-5 py-2  text-white font-bold rounded-md bg-red-700"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              )}
              <button
                className={`px-5 py-2  text-white font-bold rounded-md ${
                  !book.isCheckedOut ? "bg-green-600" : "bg-blue-600"
                }`}
                onClick={!book.isCheckedOut ? handleCheckout : handleReturn}
              >
                {!book.isCheckedOut ? "Checkout" : "Return"}
              </button>
            </div>
          </div>
          {isEditing && (
            <div className="mt-5">
              <BookForm
                book={book}
                setBook={setBook}
                setIsEditing={setIsEditing}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
