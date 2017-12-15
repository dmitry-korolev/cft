import { BotData } from 'api/bots/bots.h'

export interface BotAddFormProps {
  onSubmit: () => void
  onError: (reason: any) => void
}

export type BotAddFormValues = BotData

export type BotAddFormErrors = Partial<Record<keyof BotData, string>>
