export type Genre = {
  _id: string
  name: string
  createdAt: string
  updatedAt: string
}

export type Book = {
  _id: string
  title: string
  author: string
  isCheckedOut: boolean
  genres: Genre[]
  createdAt: string
  updatedAt: string
}
