import LoginLogic from "@/logics/login";
import storage from "@/services/storage";

Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {},
    data: {
        login: false,
        scopeUserInfo: false
    },
    ready() {
        const login = !!storage.getUserInfo()
        if (login) {
            this.setData({
                login
            })
        } else {
            const self = this
            wx.getSetting({
                success: (res) => {
                    let scopeUserInfo = false
                    if (typeof res.authSetting["scope.userInfo"] === 'undefined') {
                        scopeUserInfo = false
                    } else {
                        scopeUserInfo = res.authSetting["scope.userInfo"]
                    }
                    self.setData({
                        scopeUserInfo
                    })
                }
            })
        }
    },
    methods: {
        onLogin(e) {
            const self = this
            if (this.data.scopeUserInfo === true || (e.type === 'getuserinfo' && e.detail.errMsg === 'getUserInfo:ok')) {
                const loginLogic = new LoginLogic({
                    success: function (result) {
                        if (result.code === 0) {
                            self.setData({
                                login: true
                            })
                            self.triggerEvent('success', { result });
                        } else {
                            self.triggerEvent('fail', { result });
                        }
                    }
                })
                loginLogic.wechatLogin()
            } else {
                self.triggerEvent('fail', {
                    result: {}
                });
            }
        },
    }
});
