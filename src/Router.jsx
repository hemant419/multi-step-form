import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Posts from "./pages/Posts";
import Root from "./pages/Root";
import MultiStepFormWrapper from "./components/MultiStepFormWrapper";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <MultiStepFormWrapper /> },
      { path: "/posts", element: <Posts /> },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
