export default class Toast {
    // todo完善
    static show(options) {
        wx.showToast({
            title: options.title,
            icon: 'none',
            duration: typeof options['duration'] !== "undefined" ? options.duration : 1000
        })
    }

    static fail(str, duration = 1000) {
        const _str = String(str)
        wx.showToast({
            title: _str === '' ? _str : '请求错误',
            icon: 'none',
            duration: duration
        })
    }

    static success(str, duration = 1000) {
        wx.showToast({
            title: str,
            icon: 'none',
            duration: duration
        })
    }
}
