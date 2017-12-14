import { loadBotsNextPage } from 'store/bots/actions'

export interface BotAddFormState {
  title: string
  owner: string
  description: string
}

export interface BotAddFormStateHandlers {
  setState (state: BotAddFormState): BotAddFormState
}

export interface BotAddDispatchProps {
  loadBotsNextPage: typeof loadBotsNextPage
}
