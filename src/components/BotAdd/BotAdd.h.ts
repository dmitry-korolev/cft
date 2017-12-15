import { loadBotsFail, loadBotsNextPage } from 'store/bots/actions'

export interface BotAddDispatchProps {
  loadBotsNextPage: typeof loadBotsNextPage
  loadBotsFail: typeof loadBotsFail
}
