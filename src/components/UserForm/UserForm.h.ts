import { UserData, UserDataFull } from 'api/users/users.h'
import { FormikBag } from 'formik'

export interface UserFormOwnProps {
  onSubmit: (values: UserData, meta: FormikBag<{}, UserData>, id?: string) => void
  initialValues?: UserDataFull
  id?: string
  buttonText: string
}

export type UserFormValues = UserData

export type UserFormErrors = Partial<Record<keyof UserData, string>>
