import connect from "@/utils/connect";
import validate from "@/utils/validate";

Page(connect(({ loading }) => ({
    pageBodyLoading: loading.effects["categoryPage/detail"],
}))({
    data: {
        info: {}
    },
    onPullDownRefresh() {
        this.initPage()
    },
    onLoad(options) {
        this.options = !validate.isEmpty(options) ? options : { id: 8 }
        this.onPullDownRefresh()
    },
    options: {},
    initPage() {
        const { dispatch } = this
        const { id } = this.options
        dispatch({
            type: 'categoryPage/info',
            payload: {
                id
            },
            callback: (e) => {
                wx.stopPullDownRefresh()
                if (e.code === 0) {
                    const { info } = e.result
                    this.setData({
                        info,
                    })
                }
            }
        })
    },
    onShareAppMessage: function () {
        const { info } = this.data
        return {
            title: info.title,
            path: `/pages/categoryPage/detail?id=${info.id}`
        }
    }
}))
