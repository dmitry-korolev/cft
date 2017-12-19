import { loadBot } from 'store/bots/actions'
import { loadUser } from 'store/users/actions'

// Models
import { BotDataFull } from 'api/bots/bots.h'
import { UserDataFull } from 'api/users/users.h'
import { NavigationProps } from 'containers/App/App.h'
import { RouteComponentProps } from 'react-router'

export type UserPageProps = RouteComponentProps<NavigationProps> & {
  user?: UserDataFull
  userId: string
  error?: any
  isLoading?: boolean
  bots: { [K: string]: BotDataFull }
} & {
  loadUser: typeof loadUser
  loadBot: typeof loadBot
}
