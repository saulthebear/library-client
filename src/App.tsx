import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { NavBar } from "./components/NavBar"
import { AddBook } from "./components/pages/AddBook"
import { Home } from "./components/pages/Home"
import { MyBooks } from "./components/pages/MyBooks"
import { BookDetails } from "./components/pages/BookDetails"

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="bg-slate-100 grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-books" element={<MyBooks />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/books/:id" element={<BookDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
