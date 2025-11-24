import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/Home";
import ListPage from "./Components/List";
import NotFound from "./Pages/Admin/NotFound";
import Single from "./Pages/Admin/Single";
import AddNew from "./Pages/Admin/AddNew"; 
import Dashboard from "./Pages/Admin/Dashboard";
import ProRoute from "./Components/ProRoute";
import PosHome from "./Pages/POS/PosHome";
import PosOrder from "./Pages/POS/PosOrder";
import AdminLayout from "./Pages/Admin/AdminLayout";
import CustomThemeProvider from "./Context/CustomThemeProvider";
import ProductList from "./Pages/Admin/ProductList";
import UserList from "./Pages/Admin/UserList";
import UpdateProfile from "./Pages/Admin/UpadateProfile";



function App() {

  return (
    <Routes>
          <Route path="/" element={<HomePage/>}/>

            <Route
              path="admin/*"
              element={
                <ProRoute role={'admin'} allowedRoles={['admin']}>
                  <CustomThemeProvider>
                    <AdminLayout/>
                  </CustomThemeProvider>
                </ProRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />}/>

              <Route path="users">
                <Route index element={<UserList/>} />
                <Route path=":userId" element={<Single />} />
                <Route path=":userId/edit" element={<UpdateProfile/>}/>
                <Route path="new" element={<AddNew />} />
              </Route>

              <Route path="products">
                <Route index element={<ProductList/>} />
                <Route path=":productId" element={<Single />} />
                <Route path="new" element={<AddNew />} />
              </Route>
            </Route>
        


          
          <Route path="pos/*"
            element={<ProRoute role={'cashier'} allowedRoles={['cashier']}/>}
          >
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<PosHome/>}/>
            <Route path="order" element={<PosOrder/>}/>
            
          </Route>


          <Route path="*" element={<NotFound/>}/>

        
      </Routes>
    
  )
}

export default App

{/* <Route path="/products">
  <Route index element={<ProductPage/>}/>
  <Route path=":/productId" element={<Single/>}/>
  <Route path="new" element={<AddNew/>}/>
</Route> */}

{/* <Route path="/" element={<Dashboard/>}/> */}