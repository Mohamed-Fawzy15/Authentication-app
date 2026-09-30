import { Provider } from "react-redux";
import { Store } from "./Redux/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Pages/MainLayout/mainlayout";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import Home from "./Pages/Home/Home";
import Register from "./Pages/register/register";
import Login from "./Pages/Login/login";
import NotFound from "./Pages/NotFound/notFound";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "login",
          element: <Login />,
        },
        { path: "register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <Provider store={Store}>
      <RouterProvider router={routes}></RouterProvider>
    </Provider>
  );
}

export default App;
