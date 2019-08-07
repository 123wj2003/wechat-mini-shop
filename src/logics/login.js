import UserModel from '@/model/user'
import fa from '@/utils/fa'
import storage from "@/services/storage";
import Inviter from "@/utils/inviter"

export default class Login {
    userModel = new UserModel()
    options = {
        success: function () {
        },
        error: function () {
        }
    }

    constructor(options) {
        this.options = Object.assign(this.options, options);
    }

    async _wechatLogin(data) {
        const userModel = this.userModel
        const token = await userModel.login(data)
        if (token) {
            // 兼容新代码
            const app = getApp()
            app._store.dispatch({
                type: 'user/userLoginSuccessAfter',
                payload: token,
                callback: () => {
                    this.options.success({ code: 0 })
                }
            })
        } else {
            this.clearUserInfo()
            return false
        }
    }

    async wechatRegister() {
        const self = this
        const userModel = self.userModel
        await wx.login({
            success: async function (res) {
                if (res.code) {
                    const code = res.code
                    wx.getUserInfo({
                        withCredentials: true,
                        success: async function (userResult) {
                            const register = await userModel.register({
                                register_type: 'wechat_mini',
                                wechat_mini_param: {
                                    code: code,
                                    encryptedData: userResult.encryptedData,
                                    iv: userResult.iv
                                }
                            })
                            if (register) {
                                await wx.login({
                                    success: async function (loginResult) {
                                        await self._wechatLogin({
                                            login_type: 'wechat_mini',
                                            wechat_mini_code: loginResult.code
                                        })
                                    }
                                })
                            } else {
                                fa.toast.show({
                                    title: fa.code.parse(userModel.getException().getCode())
                                })
                            }
                        },
                        fail: function (error) {
                            getApp()._store.dispatch({
                                type: 'user/logout'
                            })
                            console.log(error)
                        }

                    })
                } else {
                    fa.toast.show({
                        title: res.errMsg
                    })
                }
            }
        })
    }

    // TODO 注意：微信这个异步还不知道怎么写才能行的通  await无效
    async wechatLogin(autoRegister = true) {
        const self = this
        await wx.login({
            success: async function (res) {
                const login = await self._wechatLogin({
                    login_type: 'wechat_mini',
                    wechat_mini_code: res.code
                })
                if (login === false && autoRegister === true) {
                    self.wechatRegister()
                } else {
                    Inviter.bind();
                }
            }
        });
    }

    clearUserInfo() {
        storage.removeUserInfo()
        storage.removeUserToken()
    }
}
