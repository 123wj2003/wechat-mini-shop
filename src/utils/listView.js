export default class ListView {
    list = [];
    extraParams = {};
    noMore = false;
    totalNumber = 0
    requestParams = {
        page: 1,
        rows: 6,
    }
    loading = false
    service = () => {
    }
    callback = (response) => {
    }

    constructor(options) {
        typeof options["service"] !== "undefined" && (this.service = options.service)
        typeof options["extraParams"] !== "undefined" && (this.extraParams = options.extraParams)
        typeof options["callback"] !== "undefined" && (this.callback = options.callback)
    }

    setService(service) {
        this.service = service
    }

    setExtraParams(extraParams) {
        this.extraParams = extraParams
    }

    onRefresh() {
        const { extraParams, requestParams } = this
        const { rows, } = requestParams
        this.noMore = false
        this.totalNumber = 0
        this.requestParams = Object.assign({ page: 1, rows }, extraParams)
        this.list = []
        this.request()
    }

    onReachBottom() {
        const { noMore, extraParams, requestParams, loading } = this
        const { page, rows, } = requestParams
        if (!noMore && loading === false) {
            this.requestParams = Object.assign({ page: page + 1, rows }, extraParams)
            this.request()
        }
    }

    async request() {
        const { requestParams, page } = this
        this.loading = true
        const response = await this.service(requestParams)
        try {
            if (response.code === 0) {
                const { list, total_number } = response.result
                this.noMore = list.length <= 0
                this.totalNumber = total_number
                this.list = page === 1 ? list : [...this.list, ...list]
                typeof this.callback === "function" && this.callback({
                    code: response.code,
                    result: {
                        list: this.list,
                        total_number
                    }
                })
            } else {
                this.noMore = true
            }
            this.loading = false
        } catch (e) {
            this.loading = false
        }
    }
}
