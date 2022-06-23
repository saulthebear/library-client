import { Genre as GenreType } from "../types/book"

export default function Genre({ name }: GenreType) {
  return <span className="bg-blue-200 px-2 py-1 rounded-full">{name}</span>
}
