
import VerifyCodeModel from "@/model/verifyCode"
import fa from "@/utils/fa";
import UserModel from "@/model/user"

const verifyCodeModel = new VerifyCodeModel()
const userModel = new UserModel()
Page({
    data: {
        phone: null,
        verify_code: null,
        password: null,
        sendSuccess: false
    },
    async onPress() {
        const { phone, sendSuccess } = this.data;
        if (sendSuccess === false) {
            if (!phone || phone.length !== 11) {
                return fa.toast.show({ title: '请输入手机号' })
            }else{
                const result = await verifyCodeModel.add({
                    channel_type: "sms",
                    behavior: "bind_phone",
                    receiver: phone,
                })
                if (result === true) {
                    this.setData({
                        sendSuccess: true
                    })
                } else {
                    fa.toast.show({ title: verifyCodeModel.getException().getMessage() })
                }
            }
        }
    },
    onStart() {

    },
    onEnd() {
        this.setData({
            sendSuccess: false
        })
    },
    async onSubmit() {
        const { phone, verify_code, password } = this.data;
        if (!phone) {
            return fa.toast.show({ title: '请输入手机号' })
        }
        if (!verify_code) {
            return fa.toast.show({ title: '请输入验证码' })
        }
        if (!password) {
            return fa.toast.show({ title: '请输入密码' })
        }
        const result = await userModel.bindPhone({
            phone, verify_code, password
        })
        if (result === false) {
            fa.toast.show({
                title: userModel.getException().getMessage()
            })
        } else {
            fa.toast.show({
                title: "绑定成功"
            })
            wx.navigateBack({
                delta: 1
            })
        }
    },
    onPhoneChange(e) {
        this.setData({
            phone: e.detail.value
        })
    },
    onVerifyCodeChange(e) {
        this.setData({
            verify_code: e.detail.value
        })
    },
    onPasswordChange(e) {
        this.setData({
            password: e.detail.value
        })
    },
})
