import UserList from "../../pages/Admin/UserList";
import Single from "../../pages/Admin/Single";
import AddNew from "../../pages/Admin/AddNew";

const userRoutes = [{
  path: "users",
  children: [
    { index: true, element: <UserList /> },
    { path: ":userId", element: <Single /> },
    { path: "new", element: <AddNew /> }
  ]
}];

export default userRoutes;
