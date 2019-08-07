import GoodsCategoryModel from "@/model/goodsCategory";
import connect from "@/utils/connect"
import fa from "@/utils/fa";
import ShopModel from '@/model/shop'
import GoodsModel from "@/model/goods";

const shopModel = new ShopModel()
const goodsCategoryModel = new GoodsCategoryModel()
const goodsModel = new GoodsModel()

Page(connect(({ app }) => ({
    app: app,
}))({
    data: {
        style: 3,
        style3: {
            page: 1,
            rows: 10,
            noMore: false,
            list: [],
            style: 3,
            categoryList: null,
            smallImageWidth: 0,
            categoryId: null,
            categoryClickIndex: -1
        }
    },
    async onLoad() {
        wx.showShareMenu({
            withShareTicket: true
        })
        // 店铺配置信息
        const result = await shopModel.info()
        if (result) {
            fa.cache.set('shop_info', result)
            this.init()
        }
    },
    onPullDownRefresh() {
        this.init()
        wx.stopPullDownRefresh()
    },
    async init() {
        const systemInfo = wx.getSystemInfoSync()
        const categoryListResult3 = await goodsCategoryModel.list()
        const categoryList3 = categoryListResult3.list
        this.setData({
            'style3.smallImageWidth': (systemInfo.windowWidth - 18) / 2,
            'style3.categoryList': categoryList3
        })
        this.style3GetGoodsList()

    },
    async onReachBottom() {
        if (this.data.style === 3) {
            if (this.data.style3.noMore === true) {
                return false
            } else {
                this.style3GetGoodsList()
            }
        }
    },
    async style3GetGoodsList() {
        const { style3 } = this.data
        const page = style3.page
        if (page > 1 && style3.noMore === true) {
            return
        }
        const rows = style3.rows
        const list = page === 1 ? [] : style3.list
        let requestParam = { page, rows }
        if (style3.categoryId > 0) {
            requestParam['category_ids'] = [parseInt(style3.categoryId)]
            requestParam['contains_subset'] = 1
        }
        const result = await goodsModel.list(requestParam)
        if (result) {
            let data = { page: page + 1 }
            if (result.list.length === 0) {
                data['noMore'] = true
            }
            data['list'] = list.concat(result.list)
            this.setData({
                style3: {
                    ...this.data.style3, ...data
                }
            })
        }
    },
    style3CategoryClick(e) {
        const { categoryId } = e.currentTarget.dataset
        this.setData({
            'style3.page': 1,
            'style3.categoryId': categoryId ? categoryId : null,
            'style3.categoryClickIndex': parseInt(e.currentTarget.dataset.index),
        })
        this.style3GetGoodsList()
    },
    goGoodsDetail(e) {
        wx.navigateTo({
            url: '/pages/goods/detail/index?id=' + e.currentTarget.dataset.id
        })
    },

    onShareAppMessage: function () {
        const shopInfo = fa.cache.get('shop_info')
        return {
            title: shopInfo.name,
            path: `/pages/index/index`
        }
    },
}))
