Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        images: {
            type: Array,
            value: []
        }
    },
    methods: {
        bannerPreview({ currentTarget }) {
            wx.previewImage({
                current: currentTarget.dataset.url,
                urls: this.data.images
            })
        },
    }
});
