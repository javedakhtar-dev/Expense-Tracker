import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transactions"
import AddTransaction from "./pages/AddTransaction"
import Profile from "./pages/Profile"
import Settings from "./pages/Settings"
import NotFound from "./pages/NotFound"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import ProtectedRoute from "./components/ui/ProtectedRoute"

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transactions/new" element={<AddTransaction />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
