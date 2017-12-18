import search from 'feathers-nedb-fuzzy-search'
import NeDB from 'nedb'

// Utils
import { BaseService } from 'api/base/base'
import { validateUser } from 'api/users/validateUser'
import { dbPath } from 'api/utils/dbPath'
import { mimicApiHook } from 'api/utils/mimicApiHook'

// Models
import { UserDataFull, UserLevel } from 'api/users/users.h'

export const usersServiceName = 'users'

const db: NeDB = new NeDB({
  filename: dbPath(usersServiceName),
  autoload: true,
  timestampData: true
})

class UsersService extends BaseService<UserDataFull> {
  before = {
    find: search({
      fields: ['name', 'username', 'location'],
      deep: true
    })
  }
  after = mimicApiHook()

  async create (data: UserDataFull, params: any) {
    if (!data.level) {
      data.level = UserLevel.USER
    }

    return super.create(data, params)
  }
}

export const usersService = (): any =>
  new UsersService({
    paginate: {
      default: 10,
      max: 10
    },
    incremental: true,
    serviceName: usersServiceName,
    validator: validateUser,
    Model: db
  })
