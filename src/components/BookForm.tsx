import { useId, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Book } from "../types/book"

type Props = {
  book: Book | null
  setBook: ((book: Book | null) => void) | undefined
  setIsEditing: ((isEditing: boolean) => void) | undefined
}

export function BookForm({ book, setBook, setIsEditing }: Props) {
  const [genres, setGenres] = useState<string[]>(
    book?.genres.map((genre) => genre.name) ?? []
  )

  const [title, setTitle] = useState<string>(book?.title || "")
  const [author, setAuthor] = useState<string>(book?.author || "")
  const [newGenre, setNewGenre] = useState<string>("")
  const [error, setError] = useState<string>("")

  const navigate = useNavigate()

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value)
  }

  const handleNewGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewGenre(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title || !author) {
      setError("Title and author are required")
      return
    }
    setError("")
    const updatedBook = {
      title,
      author,
      genres: genres.map((genre) => ({ name: genre })),
    }

    console.log("Submitting book: ", updatedBook)

    // If updating book
    if (setBook && setIsEditing) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/books/${book?._id}`,
          {
            method: "PUT",
            body: JSON.stringify(updatedBook),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        const data = await response.json()
        if (setBook && setIsEditing) {
          setBook(data)
          setIsEditing(false)
        }
      } catch (error) {
        console.warn("Error submitting book: ", error)
        setError("Error submitting book")
      }
    } else {
      // If creating book
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/books`, {
          method: "POST",
          body: JSON.stringify(updatedBook),
          headers: {
            "Content-Type": "application/json",
          },
        })
        if (response.status >= 400) {
          console.log("Could not create book: ", response)
          setError("Error creating book")
          return
        }
        const data = await response.json()
        const bookId = data._id
        navigate(`/books/${bookId}`)
      } catch (error) {
        console.warn("Error creating book: ", error)
        setError("Error creating book")
      }
    }
  }

  const addGenre = (genre: string) => {
    // If the genre is already in the list, do nothing
    if (genres.indexOf(genre) > -1) {
      return
    }

    setGenres([...genres, genre])
  }

  const removeGenre = (genre: string) => {
    setGenres(genres.filter((g) => g !== genre))
  }

  const handleAddGenre = () => {
    if (!newGenre) {
      return
    }
    addGenre(newGenre)
    setNewGenre("")
  }

  const id = useId()

  const genreElements = genres.map((genre) => {
    return (
      <span
        className="px-3 py-2 rounded-full bg-slate-200 font-semibold"
        key={`${id}-${genre}`}
      >
        {genre}
        <button
          type="button"
          className="ml-2 bg-white rounded-full h-5 w-5 text-sm"
          onClick={() => removeGenre(genre)}
        >
          x
        </button>
      </span>
    )
  })

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl space-y-3 border p-5 rounded-lg bg-white shadow"
    >
      {error && (
        <p className="bg-red-100 text-red-800 p-2 rounded-md">{error}</p>
      )}
      <div className="flex flex-col">
        <label htmlFor={`${id}-title`} className="font-semibold">
          Title:
        </label>
        <input
          type="text"
          id={`${id}-title`}
          onChange={handleTitleChange}
          value={title}
          className="py-2 px-3 rounded shadow-inner bg-slate-50"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor={`${id}-author`} className="font-semibold">
          Author:
        </label>
        <input
          type="text"
          id={`${id}-author`}
          onChange={handleAuthorChange}
          value={author}
          className="py-2 px-3 rounded shadow-inner bg-slate-50"
        />
      </div>

      <div>
        <p className="font-semibold mb-2">Genres:</p>
        <div className="ml-2 flex flex-wrap gap-2">{genreElements}</div>
      </div>
      <div className="flex flex-col">
        <label htmlFor={`${id}-genre`} className="font-semibold">
          Add a genre
        </label>
        <div className="flex">
          <input
            type="text"
            id={`${id}-genre`}
            onChange={handleNewGenreChange}
            value={newGenre}
            className="flex-grow py-2 px-3 rounded-l shadow-inner bg-slate-50"
          />
          <button
            type="button"
            onClick={handleAddGenre}
            className="bg-blue-700 text-white rounded-r px-5 py-1 font-semibold"
          >
            Add
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="px-5 py-2  text-white font-bold rounded-md bg-green-700"
      >
        {book ? "Update" : "Create"}
      </button>
    </form>
  )
}
