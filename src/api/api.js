const BASE = 'https://1246105.cn-shenzhen.fc.aliyuncs.com/2016-08-15/proxy/charlene-chatlog/api'

const GET = (path) => {
  return new Promise((resolve, reject) => {
    let url = `${ BASE }${ path }`
    fetch(url)
      .then(res => res.json())
      .then(data => {
        resolve(data)
      })
  })
}

const POST = (path, data) => {
  return new Promise((resolve, reject) => {
    let url = `${ BASE }${ path }`
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        resolve(data)
      })
  })
}

class Bundle {
  async all () {
    return await GET('/bundles') 
  }

  async dialogsOfName (name) {
    return await GET(`/bundle/${name}`)
  }

  async starChatItem ({ itemId, star = true }) {
    return await POST(`/chatitem/${ itemId }/star`, { star })
  }

  async deleteOne ({ name }) {
    return await POST(`/delete-bundle/${ name }`)
  }
}

class API {
  constructor () {
    this.bundle = new Bundle()
  }
}

export default new API()