import fa from "@/utils/fa";

import UserModel from '@/model/user'
import Shy from "@/utils/shy"
const userModel = new UserModel()
const Dialog = require('@/ui/dialog/dialog');

Page({
    data: {
        userInfo: null,
        isBindPhone: false,
        shyPhone:null

    },
    async onShow() {
        const userInfo = await userModel.self()
        const { phone } = userInfo || {}
        const isBindPhone = !!(phone && phone.length === 11)
        const shyPhone = isBindPhone ? Shy.phone(phone) : ''
        this.setData({
            userInfo: userInfo,
            isBindPhone,
            shyPhone
        })

    },
    async onBindPhone() {
        const { isBindPhone } = this.data
        if (isBindPhone) {
            Dialog({
                message: '您确认要解绑吗？',
                selector: '#fa-dialog-confirm',
                buttons: [{
                    text: '取消',
                    type: 'cancel'
                }, {
                    text: '确认',
                    color: 'red',
                    type: 'ok'
                }]
            }).then(async ({ type }) => {
                if (type === 'ok') {
                    const result = await userModel.unbindPhone()
                    if (result === false) {
                        fa.toast.show({
                            title: fa.code.parse(userModel.getException().getMessage())
                        })
                    } else {
                        this.onShow()
                    }
                }
            })
        } else {
            wx.navigateTo({
                url: '/pages/user/setting/bind/phone/index'
            })
        }
    },
})
