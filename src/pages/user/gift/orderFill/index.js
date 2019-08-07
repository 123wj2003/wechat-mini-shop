import fa from "@/utils/fa";
import connect from "@/utils/connect";
import Toast from "@/utils/toast";
import Goods from "@/utils/goods"
import navigation from "@/utils/navigation";

Page(connect(({ user, loading }) => ({
    login: user.login,
    userInfo: user.self,
    giftInfoLoading: loading.effects["gift/info"],
    calculateLoading: loading.effects["gift/calculate"],
    createLoading: loading.effects['gift/create']
}))({
    data: {
        options: {
            gift_grant_id: 0,
        },
        calculate: {
            goods_amount: 0,
            gift_amount: 0,
            freight_template_fee: 0,
            freight_unified_fee: 0,
            goods_freight_list: [],
            pay_amount: 0,
            pay_freight_fee: 0,
        },
        addressId: 0,
        address: {},
        message: null,
        payState: false,
        info: {
            info: "",
            gift: {},
            gift_goods: []
        },
        currentSku: {
            title: "",
            price: "0.00",
            stock: "0",
            img: "",
            spec: [],
            weight: 0
        },
        specText: ''
    },
    onLoad(options) {
        const addressId = fa.cache.get('address_checked_id')
        let payload = { options }
        if (addressId > 0) {
            payload['addressId'] = addressId
        }
        this.setData(payload, () => {
            this.init()
        })
    },
    initCalculate() {
        const { addressId } = this.data
        const { dispatch } = this
        const { gift_grant_id } = this.data.options
        let payload = {
            gift_grant_id,
        }
        if (addressId > 0) {
            payload['address_id'] = addressId
        }
        dispatch({
            type: 'gift/calculate',
            payload,
            callback: (e) => {
                if (e.code === 0) {
                    this.setData({
                        calculate: {
                            goods_amount: e.result.goods_amount,
                            gift_amount: e.result.gift_amount,
                            freight_template_fee: e.result.freight_template_fee,
                            freight_unified_fee: e.result.freight_unified_fee,
                            goods_freight_list: e.result.goods_freight_list,
                            pay_amount: e.result.pay_amount,
                            pay_freight_fee: e.result.pay_freight_fee,
                        }
                    })
                } else {
                    Toast.fail(e.msg)
                }
            }
        })
    },
    onAddressChange(id) {
        this.setData({
            addressId: id
        })
    },
    init() {
        const { dispatch } = this
        const { gift_grant_id } = this.data.options
        try {
            dispatch({
                type: 'gift/skuInfo',
                payload: { gift_grant_id },
                callback: (e) => {
                    if (e.code === 0) {
                        this.initAddress()
                        const currentSku = e.result.info
                        this.setData({
                            currentSku,
                            specText: Goods.getSkuSpecString({
                                spec: currentSku.spec,
                                pay_type: currentSku.pay_type,
                                weight: currentSku.weight
                            })
                        })
                    } else {
                        Toast.fail(e.msg)
                    }

                }
            })
            return true
        } catch (err) {
            Toast.fail(err)
            return false
        }
    },
    initAddress() {
        const { dispatch } = this
        const { addressId } = this.data
        if (addressId) {
            dispatch({
                type: 'address/info',
                payload: {
                    id: addressId
                },
                callback: (e) => {
                    if (e.code === 0) {
                        const { result: { info } } = e
                        this.setData({
                            addressId: info.id,
                            address: info
                        }, () => this.initCalculate())
                    } else {
                        Toast.fail(e.msg)
                    }
                }
            })
        } else {
            dispatch({
                type: 'address/getDefault',
                callback: ({ result: { info } }) => {
                    if (info.id) {
                        this.setData({
                            addressId: info.id,
                            address: info
                        }, () => this.initCalculate())
                    }
                }
            })
        }
    },
    onCreateOrder() {
        const { addressId, message, userInfo, calculate } = this.data
        const { dispatch } = this
        const { gift_grant_id } = this.data.options
        let payload = {
            gift_grant_id,
            message,
            address_id: addressId,
        }
        if (!parseInt(addressId)) {
            return Toast.fail('请选择收货地址')
        }
        dispatch({
            type: 'gift/create',
            payload,
            callback: (e) => {
                if (e.code === 0) {
                    const { result } = e
                    if (parseFloat(calculate.pay_amount) > 0) {
                        dispatch({
                            type: 'buy/pay',
                            payload: {
                                'order_type': 'goods_buy',
                                'pay_sn': result.pay_sn,
                                'payment_code': 'wechat',
                                'payment_channel': 'wechat_mini',
                                'openid': userInfo.wechat_open.mini_openid
                            },
                            callback: (e) => {
                                if (e.code === 0) {
                                    let payResult = e.result.content
                                    wx.requestPayment({
                                        'timeStamp': payResult.timeStamp,
                                        'nonceStr': payResult.nonceStr,
                                        'package': payResult.package,
                                        'signType': payResult.signType,
                                        'paySign': payResult.paySign,
                                        'success': () => {
                                            this.updateListRow()
                                            navigation.goBack()
                                        },
                                        'fail': () => {
                                            this.updateListRow()
                                            navigation.goBack()
                                        }
                                    })
                                } else {
                                    Toast.fail(e.msg)
                                    navigation.goBack()
                                }
                            }
                        })
                    } else {
                        Toast.success("兑换成功")
                        this.updateListRow()
                        navigation.goBack()
                    }
                } else {
                    Toast.fail(e.msg)
                }
            }
        })
    },
    onMessageChange(e) {
        this.setData({
            message: e.detail.value
        })
    },
    goAddressAdd() {
        navigation.navigate('address/add')
    },
    goAddressList() {
        navigation.navigate('address/list')
    },
    updateListRow() {
        const pages = getCurrentPages();
        const prevPage = pages[pages.length - 2];
        prevPage.updateListRow();
    }
}))
