import { useEffect, useState, useId } from "react"
import { Link } from "react-router-dom"

const fetchMember = async () => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/members/${process.env.REACT_APP_MEMBER_ID}`
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.warn("Error fetching member: ", error)
    return null
  }
}

export function MyBooks() {
  const [member, setMember] = useState<any>(null)

  useEffect(() => {
    ;(async () => {
      const member = await fetchMember()
      if (!member) return
      console.log("Member: ", member)
      setMember(member)
    })()
  }, [])

  let links = []
  const id = useId()
  links = member?.books.map((bookId: string) => (
    <div key={`${id}-bookId`}>
      <Link to={`/books/${bookId}`}>{bookId}</Link>
    </div>
  ))
  return (
    <div>
      <h1 className="text-2xl font-bold">Checked out books</h1>
      {!member && <div>Loading...</div>}
      {member && links.length > 0 && links}
      {member && links.length === 0 && <div>No books checked out</div>}
    </div>
  )
}
