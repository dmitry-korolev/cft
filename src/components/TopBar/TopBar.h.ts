import { reloadBotsCurrentPage } from 'store/bots/actions'
import { reloadUsersCurrentPage } from 'store/users/actions'

export const enum LoadingState {
  NOT_STARTED,
  LOADING,
  FINISHED
}

export interface TopBarState {
  showOverlay: boolean
  toggleOverlay: () => void
  loadingState: LoadingState
  changeLoadingState: (ls: LoadingState) => void
}

export interface TopBarhandlers {
  generateData: () => void
}

export interface TopBarStateProps {
  shouldGenerate: boolean
  reloadBotsCurrentPage: typeof reloadBotsCurrentPage
  reloadUsersCurrentPage: typeof reloadUsersCurrentPage
}

export type TopBarProps = TopBarState & TopBarhandlers & TopBarStateProps
