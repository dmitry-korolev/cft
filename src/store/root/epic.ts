import { combineEpics } from 'redux-most'

// Epics
import { botsEpic } from 'store/bots/epics'
import { usersEpic } from 'store/users/epics'

export const rootEpic = combineEpics([botsEpic as any, usersEpic as any])
