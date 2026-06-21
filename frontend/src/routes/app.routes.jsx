import { createBrowserRouter } from "react-router"
import Login from "../features/auth/pages/Login"
import Register from "../features/auth/pages/Register"
import Protected from "../features/auth/components/Protected"
import Home from "../features/ai/pages/Home"
import Interview from "../features/ai/pages/interview"
import Error from "../features/ai/pages/Error"

export const router = createBrowserRouter([
    {
        path: "/login",
        element : <Login/>
    },
     {
        path: "/register",
        element : <Register/>
    },{
        path: "/",
        element : <Protected>
            <Home />
        </Protected>
    },
    {
        path:"/interview/:interviewId",
        element : <Protected><Interview /></Protected>
    },{
        path:"/error",
        element : <Error />
    }
])
