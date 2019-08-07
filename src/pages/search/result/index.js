import GoodsModel from '@/model/goods'
import Json from "@/utils/json";
const goodsModel = new GoodsModel()

Page({
    data: {
        keywords: '',
        categoryId: 1,
        categoryKeywords: '',
        brandIds: [],
        imageWidth: 0,
        page: 1,
        rows: 10,
        noMore: false,
        list: [],
    },
    async onLoad({ keywords = '', category_id = '', category_keywords = '', brand_ids = [] }) {
        const systemInfo = wx.getSystemInfoSync()
        this.setData({
            keywords,
            categoryId: category_id,
            categoryKeywords: category_keywords,
            imageWidth: (systemInfo.windowWidth - 18) / 2,
            brandIds: Json.isJson(brand_ids) ? JSON.parse(brand_ids) : []
        })
        if (category_id||brand_ids.length>0) {
            this.getList()
        }
    },
    async getList() {
        const page = this.data.page
        if (page > 1 && this.data.noMore === true) {
            return
        }
        const rows = this.data.rows
        const list = page === 1 ? [] : this.data.list
        let requestParam = { page, rows }
        if (this.data.categoryId > 0) {
            requestParam['category_ids'] = [parseInt(this.data.categoryId)]
        }
        if (this.data.brandIds.length > 0) {
            requestParam['brand_ids'] = this.data.brandIds
        }
        if (this.data.keywords) {
            requestParam['keywords'] = this.data.keywords
        }
        const result = await goodsModel.list(requestParam)
        if (result) {
            let data = { page: page + 1 }
            if (result.list.length === 0) {
                data['noMore'] = true
            }
            data['list'] = list.concat(result.list)
            this.setData(data)
        }
    },
    async onReachBottom() {
        if (this.data.noMore === true) {
            return false
        } else {
            this.getList()
        }
    },
    goGoodsDetail(e) {
        wx.navigateTo({
            url: '/pages/goods/detail/index?id=' + e.currentTarget.dataset.id
        })
    },
    onSearchConfirm(e) {
        this.setData({
            keywords: e.detail.keywords,
            categoryId: e.detail.categoryId,
            categoryKeywords: e.detail.categoryKeywords,
            brandIds: e.detail.brandIds,
            page: 1
        })
        this.getList()
    }
})
