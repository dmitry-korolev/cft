// import authentication from 'feathers-authentication'
import { Application } from 'feathers'

// Services
import { botsService, botsServiceName } from 'api/bots/bots'
import { usersService, usersServiceName } from 'api/users/users'

const apiEndpoint = (serviceName: string): string => `/api/${serviceName}`

export const setupApplication = (app: Application) => {
  // app.configure(authentication({
  //   userEndpoint: apiEndpoint(usersServiceName)
  // }))

  app.use(apiEndpoint(usersServiceName), usersService())
  app.use(apiEndpoint(botsServiceName), botsService())
}
