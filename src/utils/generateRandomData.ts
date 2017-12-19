// Utils
import { botsServiceName } from 'api/bots/bots'
import { usersServiceName } from 'api/users/users'
import { apiEndpoint } from 'api/utils/apiEndpoint'
import { times, uniq } from 'ramda'

const randImage = 'https://picsum.photos/200/200/?image='
const randText = 'https://baconipsum.com/api/?type=all-meat&paras=2'
const randUsers = 'https://randomuser.me/api/?nat=us,dk,fr,gb&results=200'

const rand = (min: number, max: number) => Math.floor(min + Math.random() * (max + 1 - min))
const ramdomElements = (array: any[]) => {
  const size = rand(1, array.length)
  return uniq(times(() => array[Math.floor(Math.random() * array.length)], size))
}

const generateRandomBots = async () => {
  const randM = rand(1, 200)

  for (let i = 0; i < 5; i += 1) {
    const text = await fetch(randText).then(async (r) => r.json())
    const data = {
      title: text[0].split(' ')[0],
      picture: randImage + (i + 1) * randM,
      description: text[1]
    }

    await fetch(apiEndpoint(botsServiceName), {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}

const postUser = async (data: any, botIds: string[]) => {
  const d = {
    gender: data.gender,
    name: `${data.name.first} ${data.name.last}`,
    avatarUrl: data.picture.medium,
    email: data.email,
    dob: data.dob,
    phone: data.phone,
    botIds: ramdomElements(botIds)
  }

  return fetch(apiEndpoint(usersServiceName), {
    method: 'POST',
    body: JSON.stringify(d),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
}

const generateRandomUsers = async () => {
  const [botIds, usersData] = await Promise.all([
    fetch(apiEndpoint(botsServiceName))
      .then(async (r) => r.json())
      .then((r) => r.result.map((b: any) => b._id)),
    fetch(randUsers)
      .then((d: any) => d.json())
      .then((r: any) => r.results)
  ])

  for (const user of usersData) {
    await postUser(user, botIds)
  }
}

export const generateRandomData = async () => {
  await generateRandomBots()
  await generateRandomUsers()
}
