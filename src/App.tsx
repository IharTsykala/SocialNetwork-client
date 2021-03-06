import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import createSagaMiddleware from "redux-saga"
import AllUsersPage from "./pages/allUsersPage/allUsersPage"
import UserInformationPage from "./pages/userInformationPage/userInformationPage"
import GetLoginPage from "./pages/GetLoginPage/GetLoginPage"
import GetLogUpPage from "./pages/GetLogUpPage/GetLogUpPage"
import { GetStartPage } from "./pages/GetStartPage/GetStartPage"
import Navbar from "./components/Navbar/Navbar"
import {
  PrivateRoute,
  defaultPrivateRouteProps,
} from "./PrivateRoutes/PrivateRouteForUsers"
import {
  PrivateRouteForAdmins,
  defaultPrivateRouteForAdminsProps,
} from "./PrivateRoutes/PrivateRouteForAdmins"
import GetAlbumByID from "./pages/GetAlbumByID/GetAlbumByID"
import PageFriends from "./pages/pageFriends/pageFriends"
import AllAlbumsPage from "./pages/allAlbumsPage/allAlbumsPage"
import AllPhotosPage from "./pages/allPhotosPage/allPhotosPage"
import NotFound from "./pages/NotFoundPage/NotFound"
import { AdminAllUsers } from "./pages/AdminPages/AdminAllUser/AdminAllUser"
import { UserEditInformation } from "./pages/UserEditInformationPage/UserEditInformationPage"
import rootReducer from "./Redux"
import AppCSS from "./App.module.css"
import Box from "@material-ui/core/Box"
import DialogsPage from "./pages/DialogsPage/DialogsPage"
import avatarSaga from "./Redux/store/avatar/avatar.sagas"
import dialogSaga from "./Redux/store/dialogs/dialogs.sagas"
import albumsSaga from "./Redux/store/albums/albums.sagas"
import userSaga from "./Redux/store/user/user.sagas"

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  composeWithDevTools({ trace: true, traceLimit: 25 })(
    applyMiddleware(sagaMiddleware)
  )
)

sagaMiddleware.run(avatarSaga)
sagaMiddleware.run(dialogSaga)
sagaMiddleware.run(albumsSaga)
sagaMiddleware.run(userSaga)

export const App: React.FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Box component="div" className={AppCSS.wrapper}>
        <Navbar />
        <Box component="main" className="main">
          <Switch>
            <Route
              component={GetStartPage}
              path="/social-network-client"
              exact
            />
            <Route component={GetLoginPage} path="/LogIn" exact />
            <Route component={GetLogUpPage} path="/SignUp" exact />
            <PrivateRoute
              {...defaultPrivateRouteProps}
              component={DialogsPage}
              path="/:id/dialogs"
              exact
            />
            <PrivateRoute
              {...defaultPrivateRouteProps}
              component={AllUsersPage}
              path="/user/allUsers"
              exact
            />
            <PrivateRoute
              {...defaultPrivateRouteProps}
              component={UserInformationPage}
              path="/user/profile/:id"
              exact
            />
            <PrivateRoute
              {...defaultPrivateRouteProps}
              component={PageFriends}
              path="/user/:id/friends"
              exact
            />
            <PrivateRoute
              {...defaultPrivateRouteProps}
              component={GetAlbumByID}
              path="/user/:id/album"
              exact
            />
            <PrivateRoute
              {...defaultPrivateRouteProps}
              component={AllAlbumsPage}
              path="/user/:id/allAlbums"
              exact
            />
            <PrivateRoute
              {...defaultPrivateRouteProps}
              component={AllPhotosPage}
              path="/user/:id/allPhotos"
              exact
            />
            <PrivateRoute
              {...defaultPrivateRouteProps}
              component={UserEditInformation}
              path="/user/:id/edit"
              exact
            />
            <PrivateRouteForAdmins
              {...defaultPrivateRouteForAdminsProps}
              component={AdminAllUsers}
              path="/admin/all"
              exact
            />
            <PrivateRouteForAdmins
              {...defaultPrivateRouteForAdminsProps}
              component={AdminAllUsers}
              path="/admin/:id"
              exact
            />
            <Route path="*" component={NotFound} />
          </Switch>
        </Box>
      </Box>
    </BrowserRouter>
  </Provider>
)
