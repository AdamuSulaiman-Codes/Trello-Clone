import { createBrowserRouter } from "react-router";
import App from "../App";
import RootPage from "../Pages/RootPage";
import MainSection from "../componenets/MainSection";

const router = createBrowserRouter([
    {path: "/", element: <RootPage/>, children: [
        {path: "", element: <App/>},
        {path: ":id", element: <MainSection/>},
    ]}
])

export default router;