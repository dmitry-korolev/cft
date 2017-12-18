import { BotData, BotDataFull } from 'api/bots/bots.h'
import { FormikBag } from 'formik'

export interface BotFormOwnProps {
  onSubmit: (values: BotData, meta: FormikBag<{}, BotData>, id?: string) => void
  initialValues?: BotDataFull
  id?: string
  buttonText: string
}

export type BotFormValues = BotData

export type BotFormErrors = Partial<Record<keyof BotData, string>>
