// pages/cityWeather/cityWeather.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        curCity: null,
        cityWeatherInfo: null,
        today: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        selectStatus: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        setInterval(() => {
            this.upDateTime();
        }, 1000)
        
        console.log(options.city);
        const city = options.city;
        wx.request({
            url: 'https://www.apiopen.top/weatherApi',
            data: {
                city
            },
            success: (res) => {
                console.log(res.data.data);
                this.setData({
                    curCity: city,
                    cityWeatherInfo: res.data.data
                })
            }
        })
    },
    upDateTime () {
        this.setData({
            time: new Date().toLocaleTimeString()
        })
    },
    selectCity () {
        wx.redirectTo({
            url: '../weather/weather'
        })
    },
    selectFuture () {
        this.setData({
            selectStatus: true 
        })
    },
    selectYesterday () {
        this.setData({
            selectStatus: false
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})