import ShopModel from '@/model/shop'
import AreaModel from '@/model/area'
import fa from "@/utils/fa"
import Url from "@/utils/url"
import Inviter from "@/utils/inviter"
import * as core from 'dva-core';
import createLoading from 'dva-loading';
import models from '@/_temp/dvaModel';

const shopModel = new ShopModel()
const areaModel = new AreaModel()

const dvapp = core.create({
    initialReducer: {}
});

dvapp.use(createLoading({ effects: true }));

let registered

if (!registered) models.forEach(model => dvapp.model(model));

registered = true;


dvapp.start();

App({
    ...dvapp,
    async onLaunch() {
        await dvapp._store.dispatch({ type: 'user/initUserinfo' });
        // 店铺配置信息
        const result = await shopModel.info()
        if (result) {
            fa.cache.set('shop_info', result)
        }
        // 地址预缓存
        areaModel.cache()

    },
    async onShow(options) {
        // 全局邀请人注册 scene
        if (typeof options['query'] !== "undefined") {
            // get默认参数优先级高
            if (typeof options['query']['inviter_user_id'] !== "undefined") {
                fa.cache.set('inviter_user_id', parseInt(options.query.inviter_user_id))
            } else if (typeof options['query']['scene'] !== "undefined") {
                // 场景参数次级  "scene": "a=1"
                const scenePrarms = Url.parseUrl(decodeURIComponent(options['query']['scene']))
                if (scenePrarms && typeof scenePrarms['inviter_user_id'] !== "undefined") {
                    fa.cache.set('inviter_user_id', parseInt(scenePrarms.inviter_user_id))
                }
            }
        }
        Inviter.bind();
    },
})
