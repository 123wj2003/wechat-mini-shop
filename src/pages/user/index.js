import fa from '@/utils/fa'
import OrderModel from '@/model/order'
import connect from "@/utils/connect";

const orderModel = new OrderModel()
Page(connect(({ user }) => ({
    login: user.login,
    userInfo: user.self,
}))({
    data: {
        stateNum: null,
    },
    goOrderList(e) {
        wx.navigateTo({
            url: '/pages/order/list/index?state_type=' + e.currentTarget.dataset.stateType
        })
    },
    goAddressList() {
        wx.navigateTo({
            url: '/pages/address/list/index'
        })
    },
    goEvaluateList() {
        wx.navigateTo({
            url: '/pages/evaluate/list/index'
        })
    },
    goUserSetting() {
        wx.navigateTo({
            url: '/pages/user/setting/index'
        })
    },
    goRefundList() {
        wx.navigateTo({
            url: '/pages/refund/list/index'
        })
    },
    onLoad() {
        wx.showShareMenu({
            withShareTicket: true
        })
    },
    onLoginSuccess() {

    },
    async onShow() {
        const { login } = this.data
        if (login) {
            const stateNum = await orderModel.stateNum()
            this.setData({
                stateNum: stateNum
            })
        }
    },
    onShareAppMessage: function () {
        const shopInfo = fa.cache.get('shop_info')
        return {
            title: shopInfo.name,
            path: `/pages/index/index`
        }
    }
}))
