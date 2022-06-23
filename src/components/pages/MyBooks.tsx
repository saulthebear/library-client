import { useEffect, useState, useId } from "react"
import { Link } from "react-router-dom"
import { Books } from "../Books"

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
  const [isLoading, setIsLoading] = useState<Boolean>(false)

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const member = await fetchMember()
      setIsLoading(false)
      if (!member) return
      console.log("Member: ", member)
      setMember(member)
    })()
  }, [])

  let content
  if (isLoading) {
    content = <div>Loading...</div>
  } else if (member && member.books.length > 0) {
    content = <Books books={member.books} />
  } else if (member) {
    content = <div>No books checked out</div>
  }
  return (
    <div className="flex justify-center">
      <div className="p-5">
        <h1 className="text-2xl font-bold">Checked out books</h1>
        {content}
      </div>
    </div>
  )
}
