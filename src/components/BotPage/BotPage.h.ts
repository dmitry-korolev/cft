import { BotDataFull } from 'api/bots/bots.h'
import { NavigationProps } from 'containers/App/App.h'
import { RouteComponentProps } from 'react-router'

export type BotPageProps = RouteComponentProps<NavigationProps> & BotDataFull
