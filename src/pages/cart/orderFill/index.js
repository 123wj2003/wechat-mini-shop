import fa from "@/utils/fa";

import CartModel from "@/model/cart";
import BuyModel from "@/model/buy";
import AddressModel from "@/model/address";
import connect from "@/utils/connect";

const cartModel = new CartModel()
const buyModel = new BuyModel()
const addressModel = new AddressModel()
Page(connect(({ user }) => ({
    login: user.login,
    userInfo: user.self,
}))({
    data: {
        delta: 1,
        way: 'cart', // way	否	购买途径，cart 购物车（默认）、buy_now 立即购买
        calculate: null,
        cartList: [],
        cartIds: [],
        addressId: null,
        address: {},
        message: null,
        payState: false,
        total: 0,
        couponId: 0,
        couponInfo: {},
        usableTotalNumber: 0
    },
    onMessageChange(e) {
        this.setData({
            message: e.detail.value
        })
    },
    goAddressAdd() {
        wx.navigateTo({
            url: '/pages/address/add/index'
        })
    },
    goAddressList() {
        wx.navigateTo({
            url: '/pages/address/list/index'
        })
    },
    async onLoad(options) {
        // 清空被选中，为了带过来列表返回的
        fa.cache.set('address_checked_id', null)
        let cartIds = JSON.parse(options.cart_ids);
        // let cartIds = [802];
        let way = 'cart'
        let delta = this.data.delta
        if (typeof options['way'] !== 'undefined' && options['way'] === 'buy_now') {
            way = 'buy_now'
            delta = 1
        } else {
            delta = 2
        }
        this.setData({
            cartIds,
            way,
            delta
        })
    },
    // 计算费用
    async initCalculate() {
        const { couponId, cartIds, addressId } = this.data
        const calculate = await buyModel.calculate({
            cart_ids: cartIds,
            address_id: addressId,
            coupon_user_id: couponId
        })
        if (calculate) {
            this.setData({
                calculate
            })
        } else {
            fa.toast.show({
                title: fa.code.parse(buyModel.getException().getCode())
            })
        }
    },
    onCouponPress() {
        this.selectComponent('#coupon-modal').show()
    },
    onUsableTotalNumberChange(e) {
        this.setData({
            usableTotalNumber: e.detail.usableTotalNumber
        })
    },
    onCouponChange(e) {
        const { selectId, selectCouponInfo } = e.detail
        this.setData({
            couponId: selectId,
            couponInfo: selectCouponInfo
        }, () => {
            this.initCalculate()
        })
    },
    // 获得默认地址
    async initAddress() {
        let address = []
        if (this.data.addressId > 0) {
            address = await addressModel.info({
                id: this.data.addressId
            })
        } else {
            address = await addressModel.getDefault()
        }
        if (address) {
            this.setData({
                addressId: address.id,
                address
            })
            return address
        } else {
            return false
        }
    },
    async onShow() {
        const payState = this.data.payState
        if (payState === false) {
            const addressId = fa.cache.get('address_checked_id')
            if (addressId > 0) {
                this.setData({ addressId })
            }
            const cartListState = await this.initCartList()
            if (cartListState === true) {
                const address = await this.initAddress()
                if (address.id > 0) {
                    await this.initCalculate()
                }
            } else {
                fa.toast.show({
                    title: '支付商品状态已变，请重新选择'
                })
                setTimeout(function () {
                    wx.navigateBack({ delta: this.data.delta })
                }, 1500)
            }
        }

    },
    async initCartList() {
        const cartIds = this.data.cartIds
        let checkedGoodsSkuInfoIds = []
        let checkedCartIds = []
        let total = 0
        const result = await cartModel.list({
            ids: cartIds
        })
        if (result.list.length > 0) {
            const cartList = result.list
            for (let i = 0; i < cartList.length; i++) {
                total += parseFloat(cartList[i].goods_price) * cartList[i].goods_num
                cartList[i]['goods_spec_string'] = cartList[i].goods_spec[0].id !== 0 ? cartList[i].goods_spec.map(function (item) {
                    return `${item.name}:${item.value_name}`
                }) : ''
            }
            total = parseFloat(total.toFixed(2))

            this.setData({
                checkedCartIds,
                checkedGoodsSkuInfoIds,
                cartList,
                total
            })
            return true
        } else {
            return false
        }
    },
    async onCreateOrder() {
        const { way, addressId, cartIds, message, couponId, userInfo } = this.data

        const self = this
        if (!addressId) {
            fa.toast.show({
                title: '请选择收货地址'
            })
            return
        }
        let payload = {
            'way': way,
            'address_id': addressId,
            'cart_ids': cartIds,
            'message': message,
        }

        if (couponId > 0) {
            payload['coupon_user_id'] = couponId
        }
        const result = await buyModel.create(payload)
        if (result) {
            // 支付modal也算onShow 这儿临时限制下
            this.setData({
                payState: true
            })
            const pay_amount = this.data.calculate.pay_amount
            // 发起支付，未填写openid是因为本次开发小程序为必须微信授权登录
            const payResult = await buyModel.pay({
                'order_type': 'goods_buy',
                'pay_sn': result.pay_sn,
                'payment_code': 'wechat',
                'payment_channel': 'wechat_mini',
                'openid': userInfo.wechat_open.mini_openid
            })
            if (payResult) {
                wx.requestPayment({
                    'timeStamp': payResult.timeStamp,
                    'nonceStr': payResult.nonceStr,
                    'package': payResult.package,
                    'signType': payResult.signType,
                    'paySign': payResult.paySign,
                    'success': function () {
                        wx.redirectTo({
                            url: `/pages/pay/result/index?pay_amount=${pay_amount}&order_id=${result.order_id}&pay_sn=${result.pay_sn}`
                        })
                    },
                    'fail': function (res) {
                        setTimeout(function () {
                            wx.redirectTo({
                                url: `/pages/order/detail/index?id=${result.order_id}`
                            })
                        }, 1000)
                    }
                })
            } else {
                fa.toast.show({
                    title: '支付失败：' + fa.code.parse(buyModel.getException().getCode())
                })
                wx.navigateBack({ delta: self.data.delta })
            }
        } else {
            fa.toast.show({
                title: +fa.code.parse(buyModel.getException().getCode())
            })
        }

    }
}))
