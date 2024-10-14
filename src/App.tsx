import { useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from "./routes/route";
// import ProtectedRouteWrapper from "./components/ProtectedRouteWrapper";

function App() {
  const [count, setCount] = useState(0)

  return (
    // <ProtectedRouteWrapper>
      <RouterProvider router={router} />
    {/* </ProtectedRouteWrapper> */}
  )
}

export default App
