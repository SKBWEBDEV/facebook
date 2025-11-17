import "./App.css";
import Home from "./components/home/Home"
import firebaseConfig from "./components/firebase/firebaseConfig";
import Sign from "./components/signup/sign";
import Login from "./components/Login/Log";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Forgote from "./components/forgote/forgote";
import Main from "./components/main/Main";
import Logout from "./components/logout/Logout";
import UserList from "./components/users/UserList";
import Suggestions from "./components/suggestions/Suggestions";
import Friends from "./components/friends/Friends";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Home />
        </div>
      ),
    },
    {
      path: "/sign",
      element: (
        <div>
          <Sign />
        </div>
      ),
    },
    {
      path: "/login",
      element: (
        <div>
          <Login />
        </div>
      ),
    },
    {
      path: "/main",
      element: (
        <div>
          <Main />
        </div>
      ),
    },
    {
      path: "/user",
      element: (
        <div>
          <UserList />
        </div>
      ),
    },
    {
      path: "/suggestion",
      element: (
        <div>
          <Suggestions />
        </div>
      ),
    },
    {
      path: "/friends",
      element: (
        <div>
          <Friends />
        </div>
      ),
    },
    {
      path: "/logout",
      element: (
        <div>
          <Logout />
        </div>
      ),
    },
    {
      path: "/forgote",
      element: (
        <div>
          <Forgote />
        </div>
      ),
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
