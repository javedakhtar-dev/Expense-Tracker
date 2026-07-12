import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Authentication from "./pages/Authentication"
import Transactions from "./pages/Transactions"
import AddTransaction from "./pages/AddTransaction"
import Profile from "./pages/Profile"
import Settings from "./pages/Settings"
import NotFound from "./pages/NotFound"

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Authentication action={'login'} />} />
        <Route path="/signup" element={<Authentication action={'signup'} />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transactions/new" element={<AddTransaction />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
