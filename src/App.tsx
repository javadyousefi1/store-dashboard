import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from "./routes/route";
// import ProtectedRouteWrapper from "./components/ProtectedRouteWrapper";

function App() {

  return (
    // <ProtectedRouteWrapper>
      <RouterProvider router={router} />
    // </ProtectedRouteWrapper>
  )
}

export default App
