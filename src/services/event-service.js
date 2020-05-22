export default {
  async getUser(userId) {
    const baseURL = process.env.NODE_ENV === 'production'
      ? window.location.origin
      : 'http://localhost:8000'
    return await fetch(`${baseURL}/users/${userId}`, {
      method: 'GET',
    })
      .then(data => data.json())
      .then(res => {
        return {
          id: userId,
          ...res,
        }
      })
  },
}
