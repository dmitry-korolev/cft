import { BotDataFull } from 'api/bots/bots.h'
import { UserData, UserDataFull } from 'api/users/users.h'
import { FormikBag, InjectedFormikProps } from 'formik'

export interface UserFormOwnProps {
  onSubmit: (values: UserData, meta: FormikBag<{}, UserData>, id?: string) => void
  initialValues?: UserDataFull
  id?: string
  buttonText: string
}

export interface UserFormStateProps {
  bots: BotDataFull[]
}

export type UserFormValues = UserData

export type UserFormErrors = Partial<Record<keyof UserData, string>>

export type UserFormProps = InjectedFormikProps<UserFormOwnProps, UserFormValues> &
  UserFormOwnProps &
  UserFormStateProps
