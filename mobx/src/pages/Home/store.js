import { observable, action, computed, runInAction } from 'mobx'

// simulate network deley
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

class UsersStore {
  @observable data = []
  @observable loading = false
  @observable total = 0
  @observable error = ''

  @action
  async searchUsers(username, page) {

    this.loading = true

    await delay(2000)

    try {
      const response = await fetch(`https://api.github.com/search/users?q=${username}&page=${page}`)
      let resData = await response.json()

      // 异步 action 之后，再次修改状态需要动作:
      runInAction(() => {
        this.loading = false
        this.data = resData.items
        this.total = resData.total_count
      })

    }catch(e) {
      runInAction(() => {
        this.loading = false
        this.error = 'No This User'
      })
    }
  }
}

class FollowersStore {
  @observable data = []
  @observable loading = false
  @observable total = 0
  @observable error = ''

  @action
  async getFollowers(username, page) {
    this.loading = true

    await delay(2000)

    try {
      const response = await fetch(`https://api.github.com/users/${username}/followers?page=${page}`)
      let resData = await response.json()

      // 异步 action 之后，再次修改状态需要动作:
      runInAction(() => {
        this.loading = false
        this.data = resData
      })
    }catch(e) {
      runInAction(() => {
        this.loading = false
        this.error = 'No This User'
      })
    }
  }
}

class FollowingsStore {
  @observable data = []
  @observable loading = false
  @observable total = 0
  @observable error = ''

  @action
  async getFollowings(username, page) {
    this.loading = true

    await delay(2000)

    try {
      const response = await fetch(`https://api.github.com/users/${username}/following?page=${page}`)
      let resData = await response.json()

      // 异步 action 之后，再次修改状态需要动作:
      runInAction(() => {
        this.loading = false
        this.data = resData
      })
    }catch(e) {
      runInAction(() => {
        this.loading = false
        this.error = 'No This User'
      })
    }
  }
}

export const usersStore = new UsersStore
export const followersStore = new FollowersStore
export const followingsStore = new FollowingsStore
