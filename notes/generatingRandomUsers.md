```js
const generateUsers = (count, botIds) => {
  const rand = (min, max) => Math.floor(min + Math.random() * (max + 1 - min))
  const randA = (a) => {
    const r = Array(rand(1, a.length)).fill(0)
    return [...new Set(r.map(() => a[Math.floor(Math.random() * a.length)]))]
  }
  
  const postUser = (data) => {
    const d = {
      gender: data.gender,
      name: `${data.name.first} ${data.name.last}`,
      avatarUrl: data.picture.medium,
      location: data.location,
      email: data.email,
      username: data.login.username,
      dob: data.dob,
      phone: data.phone,
      botIds: randA(botIds)
    }
    
    return fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify(d),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
     .then(console.log)
  }
  
  fetch(`https://randomuser.me/api/?nat=us,dk,fr,gb&results=${count}`)
    .then(d => d.json())
    .then(r => r.results)
    .then(async r => {
      for (let i = 0; i < r.length; i++) {
        await postUser(r[i])
       }
    })
}
```