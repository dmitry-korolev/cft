import { BotData } from 'api/bots/bots.h'
import { FormikBag } from 'formik'

export interface BotFormProps {
  onSubmit: (values: BotData, meta: FormikBag<{}, BotData>) => void
  initialValues?: BotData
}

export type BotFormValues = BotData

export type BotFormErrors = Partial<Record<keyof BotData, string>>
