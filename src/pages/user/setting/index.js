import connect from "@/utils/connect";

Page(connect(({ user }) => ({
    login: user.login,
    userInfo: user.self,
}))({
    data: {
        isBindPhone: false,
    },
    onShow() {
        const { userInfo } = this.data
        const { phone } = userInfo || {}
        const isBindPhone = !!(phone && phone.length)
        this.setData({
            isBindPhone
        })
    },
    logout() {
        this.dispatch({
            type: 'user/logout'
        })
        wx.switchTab({
            url: '/pages/user/index'
        })
    },
}))
