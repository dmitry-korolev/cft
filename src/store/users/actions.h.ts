import { UserDataFull } from 'api/users/users.h'
import { FormikBag } from 'formik'

export interface UpdateUserMeta {
  bag: FormikBag<{}, UserDataFull>
  id: string
}
