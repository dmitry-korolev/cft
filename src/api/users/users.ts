import NeDB from 'nedb'

// Utils
import { BaseService } from 'api/base/base'
import { validateUser } from 'api/users/validateUser'
// import { combineHooks } from 'api/utils/combineHooks'
import { dbPath } from 'api/utils/dbPath'
// import { restrictToAdmin } from 'api/utils/restrictToAdmin'

// Models
import { UserData, UserLevel } from 'api/users/users.h'

export const usersServiceName = 'users'

const db: NeDB = new NeDB({
  filename: dbPath(usersServiceName),
  autoload: true
})

class UsersService extends BaseService<UserData> {
  // before = combineHooks(
  //   restrictToAdmin()
  // )

  async create (data: UserData, params: any) {
    if (!data.level) {
      data.level = UserLevel.USER
    }

    return super.create(data, params)
  }
}

export const usersService = (): any =>
  new UsersService({
    paginate: {
      default: 50,
      max: 50
    },
    serviceName: usersServiceName,
    validator: validateUser,
    Model: db
  })
