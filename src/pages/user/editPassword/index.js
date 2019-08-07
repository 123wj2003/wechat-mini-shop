
import fa from "@/utils/fa";
import UserModel from "@/model/user"

const userModel = new UserModel()
Page({
    data: {
        oldpassword: null,
        password: null,
        confirmpassword: null
    },
    async onSubmit() {
        const { oldpassword, password, confirmpassword } = this.data;
        if (!oldpassword) {
            return fa.toast.show({ title: '请输入旧密码' })
        }
        if (!password) {
            return fa.toast.show({ title: '请输入密码' })
        }
        if (password !== confirmpassword) {
            return fa.toast.show({ title: '两次新密码不一致' })
        }
        if (oldpassword === password) {
            return fa.toast.show({ title: '新密码不能与旧密码一样' })
        }
        const result = await userModel.editPassword({
            oldpassword, password
        })
        if (result === false) {
            fa.toast.show({
                title: userModel.getException().getMessage()
            })
        } else {
            fa.toast.show({
                title: "修改成功"
            })
            wx.navigateBack({
                delta: 1
            })
        }
    },
    onOldPasswordChange(e) {
        this.setData({
            oldpassword: e.detail.value
        })
    },
    onPasswordChange(e) {
        this.setData({
            password: e.detail.value
        })
    },
    onConfirmPasswordChange(e) {
        this.setData({
            confirmpassword: e.detail.value
        })
    },
})
