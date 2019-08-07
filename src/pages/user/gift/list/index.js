import connect from "@/utils/connect";
import giftService from "@/services/gift"
import ListView from "@/utils/listView";
import navigation from "@/utils/navigation";

Page(connect(({ user }) => ({
    login: user.login,
}))({
    data: {
        list: []
    },
    listView: null,
    list: [],
    onLoad() {
        this.listView = new ListView({
            service: giftService.grantList,
            extraParams: { coupon_state: 2 },
            callback: (e) => {
                if (e.code === 0) {
                    this.setData({
                        list: e.result.list,
                    })
                }
                wx.stopPullDownRefresh()
            },
        })
        this.onPullDownRefresh()
    },
     onPullDownRefresh() {
         this.listView.onRefresh()
    },
    onReachBottom() {
        this.listView.onReachBottom()
    },
    onPress(e) {
        const item  = e.detail
        navigation.navigate("goods/detail", {
            id: item.goods_id,
        })
    },
    onReceivePress(e){
        const item  = e.detail
        navigation.navigate("user/gift/orderFill", {
            gift_grant_id: item.id,
            updateListRow: this.updateListRow
        })
    },
    updateListRow(){
        console.warn("xxxxxxxxxxxxx")
        this.listView.onRefresh()
    },
}))
