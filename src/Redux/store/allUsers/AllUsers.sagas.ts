import { put, takeEvery } from "redux-saga/effects"
import Service from "../../../services/service-user"
import {
  ActionTypes,
  putAllUsersInStateAction,
  setAllUsersWithPaginationSearchFilterAction,
  getFailureAction
} from "./allUsers.actions"

function* putAllUsersInState(actions: any) {
  try {
    let list
    if (actions.payload === "") list = []
    else list = yield Service.getUserWithSubscriptionsById(actions.payload)

    yield put(putAllUsersInStateAction(list))
  } catch (e) {
    yield put(getFailureAction(e))
  }
}

function* setAllUsersWithPaginationSearchFilter(actions: any) {
  try {
    const list = yield Service.getUserAfterPaginationAndSearchAndFilter(
      actions.payload
    )

    yield put(setAllUsersWithPaginationSearchFilterAction(list))
  } catch (e) {
    yield put(getFailureAction(e))
  }
}

export default function* putInStoreAllUsersSaga() {
  yield takeEvery(ActionTypes.GET_ALL_USERS_FOR_SAGAS, putAllUsersInState)
  yield takeEvery(
    ActionTypes.GET_ALL_USERS_WITH_PAGINATION_SEARCH_FILTER,
    setAllUsersWithPaginationSearchFilter
  )
}
