import { ActionTypes } from "./loading.actions"
import { Action } from "../interfaces/action.interface"

export interface State {
  loadingState: string
  loadingStatePhotosInCurrentAlbum: string
}

const initialState: State = {
  loadingState: "loaded",
  loadingStatePhotosInCurrentAlbum: "loaded"
}

export const loadingStateReducer = (
  state: State = initialState,
  action: Action<String>
) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING_STATE:
      return {
        ...state,
        loadingState: action.payload
      }
      case ActionTypes.SET_LOADING_STATE_PHOTOS_IN_ALBUM:
      return {
        ...state,
        loadingStatePhotosInCurrentAlbum: action.payload
      }
    default:
      return state
  }
}