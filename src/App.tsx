import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import GetAllUsers from "./pages/GetAllUsers/GetAllUsers"
import allUsers from "./pages/allUsers/allUsers"
import GetUserByID from "./pages/GetUserByID/GetUserByID"
import GetLoginPage from "./pages/GetLoginPage/GetLoginPage"
import GetLogUpPage from "./pages/GetLogUpPage/GetLogUpPage"
import { GetStartPage } from "./pages/GetStartPage/GetStartPage"
import Navbar from "./components/Navbar/Navbar"
import {
  PrivateRoute,
  defaultPrivateRouteProps
} from "./PrivateRoutes/PrivateRouteForUsers"
import {
  PrivateRouteForAdmins,
  defaultPrivateRouteForAdminsProps
} from "./PrivateRoutes/PrivateRouteForAdmins"
import GetAlbumByID from "./pages/GetAlbumByID/GetAlbumByID"
import NotFound from "./pages/NotFoundPage/NotFound"
import { AdminAllUsers } from "./pages/AdminAllUser/AdminAllUser"
import { UserEditInformation } from "./pages/UserEditInformation/UserEditInformation"
import { Provider } from "react-redux"
import rootReducer from "./Redux/store"
import DialogsPage from "./pages/DialogsPage/DialogsPage"
import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import createSagaMiddleware from "redux-saga"
import getUserOwnerThisPageForSaga from "./Redux/store/userOwnerThisPage/userOwnerThisPage.sagas"
import putInStoreNewMessageInCurrentDialogSaga from "./Redux/store/listMessagesForCurrentDialog/listMessagesForCurrentDialog.sagas"

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  composeWithDevTools({ trace: true, traceLimit: 25 })(
    applyMiddleware(sagaMiddleware)
  )
)

sagaMiddleware.run(getUserOwnerThisPageForSaga)
sagaMiddleware.run(putInStoreNewMessageInCurrentDialogSaga)

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <main className="main">
          <Switch>
            <Route component={DialogsPage} path="/:id/dialogs" exact />
            <Route component={GetStartPage} path="/" exact />
            <Route component={GetLoginPage} path="/LogIn" exact />
            <Route component={GetLogUpPage} path="/SignUp" exact />
            <PrivateRoute
              {...defaultPrivateRouteProps}
              component={GetAllUsers}
              path="/user/all"
              exact
            />
            <PrivateRoute
              {...defaultPrivateRouteProps}
              component={allUsers}
              path="/user/allUsers"
              exact
            />
            <PrivateRoute
              {...defaultPrivateRouteProps}
              component={GetUserByID}
              path="/user/:id"
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
        </main>
      </BrowserRouter>
    </Provider>
  )
}
