import Home from "./components/home/Home";
import firebaseConfig from "./components/firebase/firebaseConfig";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Main from "./components/main/Main";
import Logout from "./components/logout/Logout";
import UserList from "./components/users/UserList";
import Suggestions from "./components/suggestions/Suggestions";
import Friends from "./components/friends/Friends";
import Sign from "./components/sign/Sign";
import Log from "./components/log/Log";
import BlockUser from "./components/blockUser/BlockUser";
import MainGroupPage from "./components/maingroup/MainGroupPage";
import CreatGroup from "./components/createGroup/CreatGroup";
import PostName from "./components/postName/Poster"
import SideBer from "./components/sideber/SideBer";
import Setting from "./components/setting/Setting";


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
      path: "/post",
      element: (
        <div>
          <PostName />
        </div>
      ),
    },
    {
      path: "/login",
      element: (
        <div>
          <Log />
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
      path: "/sideber",
      element: (
        <div>
          <SideBer />
        </div>
      ),
    },
    {
      path: "/maingroup",
      element: (
        <div>
          <MainGroupPage />
        </div>
      ),
    },
    {
      path: "/creategroup",
      element: (
        <div>
          <CreatGroup />
        </div>
      ),
    },
    {
      path: "/blockuser",
      element: (
        <div>
          <BlockUser />
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
      path: "/setting",
      element: (
        <div>
          <Setting />
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
