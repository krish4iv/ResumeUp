import "react"
import { RouterProvider } from "react-router-dom"
import { router } from "../src/routes/app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { InterviewProvider } from "./features/ai/interview.context.jsx"



const App = () => {
  return (
    
      <AuthProvider>
       <InterviewProvider>
          <RouterProvider router = {router}/>
       </InterviewProvider>
      </AuthProvider>
    
  )
}

export default App
