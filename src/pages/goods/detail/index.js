import fa from '@/utils/fa'
import CartLogic from '@/logics/cart'
import connect from "@/utils/connect";
import Toast from "@/utils/toast";
import navigation from "@/utils/navigation";

Page(connect(({ user, goodsCollect }) => ({
    login: user.login,
    userInfo: user.self,
    is_collect: !!goodsCollect.state.result.state,
}))({
    data: {
        onLoaded: false,
        id: 151,
        cartTotalNumber: 0,
        cartGoods: null,
        inCartNumber: 0,
        buyMode: 'cart',         // cart buy_now
        goods_sku_id: null,
        goodsSkuInfo: null,
        showBottomPopup: false,
        specValueIdsChecked: [],
        evaluateList: [],
        spec_list: [],
        stepper: 1,
        list: [
            {
                id: '1',
                title: '商品'
            },
            {
                id: '2',
                title: '评价'
            },
            {
                id: '3',
                title: '详情'
            }
        ],
        selectedId: '1',
        detail: {},
        brandGoods: {
            total_number: 0,
            list: []
        },
    },
    async onLoad(options) {
        wx.showShareMenu({ withShareTicket: true })
        // todo 商品不存在的情况判断
        // todo 已经下架的状态
        this.setData({ id: options['id'] ? options['id'] : 151 })
        this.initGoodsInfo()
        this.initGoodsEvaluateList()
        const { login } = this.data
        login && this.initTotalNumber()
    },
    async initGoodsEvaluateList() {
        const { dispatch } = this
        dispatch({
            type: "goodsEvaluate/list",
            payload: {
                goods_id: this.data.id,
                page: 1,
                rows: 3
            },
            callback: (e) => {
                if (e.code === 0) {
                    this.setData({
                        evaluateList: e.result.list
                    })
                } else {
                    Toast.fail(e.msg)
                }
            }
        })
    },
    addCart() {
        // 判断是否需登陆了
        this.toggleGoodsSkuSelect()
        this.setData({
            buyMode: 'cart'
        });
    },
    buyNow() {
        this.toggleGoodsSkuSelect()
        this.setData({
            buyMode: 'buy_now'
        });

    },
    onLoginSuccess() {

    },
    onCollect() {
        const { dispatch } = this
        const { login, is_collect, id } = this.data;
        if (login) {
            dispatch({
                type: 'goodsCollect/changeState',
                payload: {
                    is_collect,
                    goods_ids: [id]
                },
                callback: () => {
                    this.initGoodsCollectState()
                }
            })
        }
    },
    initGoodsCollectState() {
        const { dispatch } = this
        const { login, id } = this.data
        if (login) {
            dispatch({
                type: 'goodsCollect/state',
                payload: { goods_id: id }
            })
        }
    },
    goCart() {
        if (this.data.userInfo) {
            wx.switchTab({
                url: '/pages/cart/index'
            })
        } else {
            return false
        }
    },
    toggleGoodsSkuSelect() {
        this.setData({
            showBottomPopup: !this.data.showBottomPopup
        });
    },
    onStepperChange(e) {
        this.setData({
            stepper: e.detail
        })
    },
    onGoodsSkuMatchSuccess(e) {
        this.setData({ goodsSkuInfo: e.detail.goodsSkuInfo }, () => {
            const { dispatch } = this
            dispatch({
                type: 'cart/info',
                payload: { goods_sku_id: e.detail.goodsSkuInfo.id },
                callback: (e) => {
                    if (e.code === 0) {
                        this.setData({
                            cartGoods: e.result.info,
                            inCartNumber: e.result.info.goods_num
                        })
                    }
                }
            })
        })
    },
    async onGoodsSkuMatchFail(e) {
        this.setData({
            specValueIdsChecked: e.detail.specIdValueIdsChecked,
            goodsSkuInfo: null,
            cartGoods: null,
            inCartNumber: 0
        })
    },
    async buyConfirm(e) {
        const goodsSkuInfo = this.data.goodsSkuInfo
        if (!goodsSkuInfo) {
            fa.toast.show({
                title: '请选择商品规格'
            })
            return false
        } else {
            const inCartNumber = this.data.inCartNumber + this.data.stepper
            if (inCartNumber > goodsSkuInfo.stock) {
                fa.toast.show({
                    title: '库存不足' // todo 加入到code
                })
            } else {
                const cartLogic = new CartLogic()
                const result = await cartLogic.save(goodsSkuInfo.id, this.data.buyMode === 'buy_now' ? this.data.stepper : inCartNumber)
                if (result !== false) {
                    if (this.data.buyMode === 'buy_now') {
                        const { dispatch } = this
                        dispatch({
                            type: 'cart/info',
                            payload: {
                                goods_sku_id: goodsSkuInfo.id
                            },
                            callback: (e) => {
                                if (e.code === 0) {
                                    navigation.navigate('cart/orderFill', {
                                        cart_ids: JSON.stringify([e.result.info.id])
                                    })
                                } else {
                                    Toast.fail(e.msg)
                                }
                            }
                        })
                    } else {
                        Toast.success("成功加入购物车")
                    }
                    this.setData({
                        inCartNumber: inCartNumber
                    })
                    this.initTotalNumber()
                    this.toggleGoodsSkuSelect()
                } else {
                    fa.toast.show({
                        title: fa.code.parse(cartLogic.cartModel.getException().getCode())
                    })
                }
            }
        }
    },
    async initTotalNumber() {
        const { dispatch } = this
        dispatch({
            type: "cart/totalNum",
            callback: (e) => {
                if (e.code === 0) {
                    this.setData({
                        cartTotalNumber: e.result.total_num
                    })
                } else {
                    Toast.fail(e.msg)
                }
            }
        })
    },
    async initGoodsInfo() {
        const { dispatch } = this
        const { id } = this.data
        dispatch({
            type: 'goods/info',
            payload: {
                id
            },
            callback: (e) => {
                if (e.code === 0) {
                    this.setData({
                        detail: e.result.info,
                        onLoaded: true
                    }, () => {
                        this.initGoodsCollectState()
                    })

                    if (typeof e.result.info['brand'] !== "undefined" && typeof e.result.info['brand']["id"] !== "undefined") {
                        dispatch({
                            type: 'goods/list',
                            payload: {
                                brand_ids: [e.result.info.brand.id],
                                rows: 6,
                            },
                            callback: (brandResult) => {
                                if (brandResult.code === 0) {
                                    this.setData({
                                        brandGoods: brandResult.result,
                                    })
                                } else {
                                    Toast.fail(brandResult.msg)
                                }
                            }
                        })
                    }
                } else {
                    Toast.fail(e.msg)
                }
            }
        })
    },
    onBrandPress() {
        navigation.navigate('brand/detail', {
            id: this.data.detail.brand.id
        })
    },
    bannerPreview({ currentTarget }) {
        wx.previewImage({
            current: currentTarget.dataset.url,
            urls: this.data.detail.images
        })
    },
    goGoodsEvaluateList() {
        wx.navigateTo({
            url: '/pages/goods/evaluateList/index?goods_id=' + this.data.detail.id
        })
    },
    onShareAppMessage: function () {
        const goodsInfo = this.data.detail
        return {
            title: goodsInfo.title,
            path: `/pages/goods/detail/index?id=${goodsInfo.id}`
        }
    }
}))
