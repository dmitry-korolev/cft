import { combineEpics } from 'redux-most'

// Epics
import { botsEpic } from 'store/bots/epics'

export const rootEpic = combineEpics([botsEpic])
