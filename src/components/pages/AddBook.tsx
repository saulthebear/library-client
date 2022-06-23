import { BookForm } from "../BookForm"

export function AddBook() {
  return (
    <div className="p-5 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-2">Add A Book</h1>
      <BookForm book={null} setBook={undefined} setIsEditing={undefined} />
    </div>
  )
}
