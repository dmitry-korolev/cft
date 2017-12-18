// Actions
import { updateBot } from 'store/bots/actions'

// Models
import { BotDataFull } from 'api/bots/bots.h'
import { NavigationProps } from 'containers/App/App.h'
import { RouteComponentProps } from 'react-router'

export interface BotEditDispatchProps {
  updateBot: typeof updateBot
}

interface BotEditStateProps {
  bot?: BotDataFull
  isLoading: boolean
}

export type BotEditProps = BotEditDispatchProps &
  BotEditStateProps &
  RouteComponentProps<NavigationProps>
