import connect from "@/utils/connect";
import Arr from "@/utils/array"
import navigation from "@/utils/navigation";
import Toast from "@/utils/toast";

const requestType = [
    'goods_seckill',
    'points_mall_goods',
    'coupon'
]
Page(connect(({ user, loading }) => ({
    login: user.login,
    pageBodyLoading: loading.effects["page/portal"],
}))({
    data: {
        id: null,
        pageBody: null,
        backgroundColor: '#f8f8f8'
    },
    // 外部实现
    _componentDidMount() {
    },

    // 外部实现
    _componentWillUnmount() {
    },

    // 外部实现
    onPullDownRefresh() {
        this.initPage()
        wx.stopPullDownRefresh()
    },

    onReachBottom() {
        try {
            const { pageBody, pageBodyLoading } = this.data
            const { type } = pageBody[pageBody.length - 1]

            if (
                pageBodyLoading === false &&
                Array.isArray(pageBody) &&
                pageBody.length > 0 && Arr.inArray(type, requestType)
            ) {
                const index = pageBody.length - 1
                const selectComponent = this.selectComponent(`#pageItem${index}`)
                if (selectComponent) {
                    if (typeof selectComponent['onReachBottom'] === "function") {
                        selectComponent.onReachBottom();
                    } else {
                        console.warn(`${type}没有onReachBottom`)
                    }
                } else {
                    console.warn(`没有${type}组件`)
                }
            }
        } catch (e) {
            console.warn(e)
        }
    },

    /**
     * 初始化每次重置后的数据
     * @param pageBody
     * - 设置不需要渲染的data = []
     * - 设置需要请求的到request.param
     */
    initPageBodyData(pageBody) {
        try {
            let _body = { ...pageBody }
            let promiseAll = []
            pageBody.map((item, index) => {
                if (Arr.inArray(item.type, requestType)) {
                    const selectComponent = this.selectComponent(`#pageItem${index}`)
                    if (selectComponent && typeof selectComponent['onPullDownRefresh'] === "function") {
                        selectComponent.onPullDownRefresh()
                        promiseAll.push(selectComponent.getRequest(true))
                    } else {
                        console.warn(`${item.type}没有onPullDownRefresh`)
                    }
                } else {
                    _body[index] = item
                    promiseAll.push(null)
                }
            })

            Promise.all(promiseAll).then((values) => {
                values.map((item, index) => {
                    if (item !== null) {
                        _body[index].data = values[index]["result"]["list"];
                    }
                })
                this.setData({
                    pageBody: Arr.objectToArray(_body)
                })
            });
        } catch (e) {

        }
    },
    onLoad({ id }) {
        wx.showShareMenu({
            withShareTicket: true
        })
        // this.setData({
        //     id
        // })
        this.initPage()
    },
    onBannerClick(e) {
        const dataSource = e.detail.dataSource
        const info = dataSource.data[e.detail.index]
        this.handelLink(info.link)
    },
    onGridNavBarClick(e) {
        const dataSource = e.detail.dataSource
        const info = dataSource.data[e.detail.index]
        this.handelLink(info.link)
    },
    onGoodsClick(e) {
        const dataSource = e.detail.dataSource
        const goods = dataSource.data[e.detail.index]
        const link = {
            action: 'goods',
            param: {
                id: goods.id
            }
        }
        this.handelLink(link)
    },
    onIconNavClick(e) {
        const dataSource = e.detail.dataSource
        const info = dataSource.data[e.detail.index]
        this.handelLink(info.link)
    },
    onTextNavClick(e) {
        const dataSource = e.detail.dataSource
        const info = dataSource.data[e.detail.index]
        this.handelLink(info.link)
    },
    onShopWindowClick(e) {
        const dataSource = e.detail.dataSource
        const info = dataSource.data[e.detail.index]
        this.handelLink(info.link)
    },
    onSearchClick() {
        wx.navigateTo({
            url: `/pages/goods/search/index`
        })
    },
    onItemDataChange(e) {
        const { index } = e.currentTarget.dataset
        const { data } = e.detail
        let body = { ...this.data.pageBody }
        body[index] = data
        this.setData({
            pageBody: Arr.objectToArray(body),
        })
    },
    initPage() {
        const { dispatch } = this
        dispatch({
            type: 'page/portal',
            callback: (e) => {
                if (e.code === 0) {
                    const { info } = e.result
                    this.setData({
                        pageBody: info.body,
                        backgroundColor: info.background_color
                    }, () => {
                        this.initPageBodyData(info.body)
                    })
                }
            }
        })
    },

    async handelLink(link) {
        switch (link.action) {
            case 'portal':
                wx.switchTab({
                    url: '/pages/index/index'
                })
                break
            case 'goods':
                wx.navigateTo({
                    url: `/pages/goods/detail/index?id=${link.param.id}`
                })
                break
            case 'page':
                if (getCurrentPages().length > 1) {
                    // 小程序对层级有限制
                    wx.redirectTo({
                        url: `/pages/page/detail/index?id=${link.param.id}`
                    })
                } else {
                    wx.navigateTo({
                        url: `/pages/page/detail/index?id=${link.param.id}`
                    })
                }
                break
            case 'goods_category':
                const { dispatch } = this
                dispatch({
                    type: "goodsCategory/info",
                    payload: {
                        id: link.param.id
                    },
                    callback: (e) => {
                        if (e.code === 0) {
                            navigation.navigate('goods/search', {
                                category_id: link.param.id,
                                category_keywords: e.result.info.name
                            })
                        } else {
                            Toast.fail(e.msg)
                        }
                    }
                })
                break
            case 'category_page':
                navigation.navigate('categoryPage/detail', {
                    id: link.param.id,
                })
                break
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
