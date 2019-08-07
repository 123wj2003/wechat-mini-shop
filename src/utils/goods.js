export default class Goods {
    /**
     *
     * @param {Array} goods_spec
     * @returns {string}
     */
    static getSkuSpecString({ pay_type, weight, spec }) {
        let string = pay_type === 2 ? (weight > 0 ? '重量:' + weight + 'kg' : '不计重量') : ''

        if(Array.isArray(spec) && spec.length>0){
            string += spec.map((specItem) => {
                return specItem.id > 0 ? `${specItem.name}:${specItem.value_name}` : ''
            }).join(',')
        }

        return string
    }
    /**
     *
     * @param {Array} goods_spec
     * @returns {string}
     */
    static getSkuSpecSimpleString({  spec }) {
        let string = ``
        if(Array.isArray(spec) && spec.length>0){
            string += spec.map((specItem) => {
                return specItem.id > 0 ? `${specItem.name}:${specItem.value_name}` : ''
            }).join(',')
        }
        return string
    }

    /**
     *
     * @param specValue
     * @returns {string}
     */
    static getSpecValueSign(specValue){
        let string = '['
        specValue.map((item)=>{
            string += `${item.id}`
        })
        string+=']'
        return string
    }
}
