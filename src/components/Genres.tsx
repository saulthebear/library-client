import Genre from "./Genre"
import { Genre as GenreType } from "../types/book"
import { useId } from "react"

export default function Genres({ genres }: { genres: GenreType[] }) {
  const id = useId()
  const genreComponents = genres.map((genre) => (
    <div key={`${id}-${genre._id}`}>
      <Genre {...genre} />
    </div>
  ))
  return <>{genreComponents}</>
}
