export interface BotAddFormState {
  title: string
  owner: string
  description: string
}

export interface BotAddFormStateHandlers {
  setState (state: BotAddFormState): BotAddFormState
}
