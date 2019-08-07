import connect from "@/utils/connect";

Page(connect(({ user }) => ({
    login: user.login
}))({
    data: {
        page: 1,
        rows: 10,
        noMore: false,
        list: [],
        stateTabs: [
            {
                id: '2',
                title: '待使用'
            },
            {
                id: '1',
                title: '已使用'
            },
            {
                id: '3',
                title: '已过期'
            },
        ],
        state_type: '2',
    },
    onLoad({ state_type = '2' }) {
        this.setData({
            state_type
        })
    },
    onTabChange(e) {
        this.setData({
            state_type: e.detail,
            page: 1,
            list: []
        })
        this.getList()
    },
    onShow() {
        this.initList()
    },
    initList() {
        this.setData({
            page: 1
        }, () => {
            this.getList()
        })
    },
    getList() {
        const page = this.data.page
        if (page > 1 && this.data.noMore === true) {
            return
        }
        const rows = this.data.rows
        const list = page === 1 ? [] : this.data.list
        const { dispatch } = this
        let payload = {
            page,
            rows
        }
        if (this.data.state_type !== 'all') {
            payload['coupon_state'] = this.data.state_type
        }
        dispatch({
            type: 'coupon/myList',
            payload,
            callback: (e) => {
                if (e.code === 0) {
                    let data = { page: page + 1 }
                    if (e.result.list.length === 0) {
                        data['noMore'] = true
                    }
                    data['list'] = list.concat(e.result.list)
                    this.setData(data)
                }
            }
        })
    },
    onReachBottom() {
        if (this.data.noMore === true) {
            return false
        } else {
            this.getList()
        }
    },
    onPress() {

    }
}))
