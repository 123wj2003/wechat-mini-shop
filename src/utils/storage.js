export default class Storage {
    static getUserInfo() {
        try {
            return JSON.parse(wx.getStorageSync('userInfo'));
        } catch (e) {
            return null
        }
    }

    static setUserInfo(user) {
        return wx.setStorageSync('userInfo', JSON.stringify(user))
    }

    static removeUserInfo() {
        return wx.removeStorageSync('userInfo')
    }

    static set(key, value) {
        return wx.setStorageSync(key.toString(), value)
    }

    static get(e) {
        return wx.getStorageSync(e)
    }

    static remove(key) {
        return wx.removeStorageSync(key)
    }
}
