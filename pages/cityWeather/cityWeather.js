// pages/cityWeather/cityWeather.js
import echarts from "../../ec-canvas/echarts";
let weatherChart = null;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        // 当前城市
        curCity: null,
        /// 当前城市空气质量数据
        air_now_city: null,
        // 当前城市天气情况数据集
        cityWeatherInfo: null,
        // 显示时间
        time: new Date().toLocaleTimeString(),
        // 控制近期天气(1) & 昨天天气(2)的显示
        selectStatus: 0,
        loading: false,
        // echart初始化配置
        ecObj: {
            onInit: function (canvas, width, height){
                //初始化echarts元素，绑定到全局变量，方便更改数据
                weatherChart = echarts.init(canvas, null, {
                    width: width,
                    height: height
                });
                canvas.setChart(weatherChart);
            }
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 设置定时器，每过一秒更新时间，并刷新试图
        setInterval(() => {
            this.upDateTime();
        }, 1000)
        
        const city = options.city;
        // 根据当前城市获取该城市的天气情况
        this.setData({
            loading: true
        })
        wx.request({
            url: 'https://www.apiopen.top/weatherApi',
            data: {
                city
            },
            success: (res) => {
                // 处理对象中的 风力 数据
                const cityWeatherInfo = this.dealFl(res.data.data);
                // 保存当前城市 & 天气情况数据集
                this.setData({
                    curCity: city,
                    cityWeatherInfo,
                    loading: false
                })
                this.setEchartData();
            }
        })        
    },
    // 获取当前地点的经纬度，并调用腾讯地图显示当前地点
    getLocation () {
        wx.getLocation({
            type: 'gcj02',
            success (res) {
            //   console.log(res);
              const latitude = res.latitude
              const longitude = res.longitude
              // 调用腾讯地图显示当前地点
              wx.openLocation({
                latitude,
                longitude,
                scale: 36
              })
            }
        })
    },
    // 更新时间
    upDateTime () {
        this.setData({
            time: new Date().toLocaleTimeString()
        })
    },
    // 跳转到选择城市页面
    selectCity () {
        wx.redirectTo({
            url: '../weather/weather'
        })
    },
    // 切换至显示实时天气预测
    selectForecast () {
        this.setData({
            selectStatus: 0 
        })
    },
    // 切换至显示近期天气
    selectFuture () {
        this.setData({
            selectStatus: 1 
        })
    },
    // 切换至显示昨天天气
    selectYesterday () {
        this.setData({
            selectStatus: 2
        })
    },
    // 设置echart渲染数据
    setEchartData () {
        this.getAirData()
            .then((res) => {
                console.log(res);
                const xArr = [];
                const xData = [];
                const air_now_station_slice = res.air_now_station.slice(0, 4);
                air_now_station_slice.forEach(ele => {
                    xArr.push(ele.air_sta);
                    xData.push(ele.aqi);
                })
                this.setData({
                    air_now_city: res.air_now_city
                })
                const option = {
                    color: ['#3398DB'],
                    title: {
                        text: "空气质量"
                    },
                    tooltip: {},
                    legend: {
                        data:[{
                            name: 'AQI'
                        }]
                    },
                    xAxis: {
                        type: 'category',
                        data: xArr,
                        axisTick: {
                            alignWithLabel: true
                        }
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        name: 'AQI',
                        type: 'bar',
                        data: xData,
                        barWidth: '60%'
                    }]
                }
                weatherChart.setOption(option);
            }, (err) => {
                console.log(err);
            })
    },
    getAirData () {
        return new Promise ((resolve, reject) => {
            wx.request({
                url: 'https://free-api.heweather.net/s6/air/now',
                data: {
                    location: this.data.curCity,
                    key: 'a5918073dc874e91a1ebb81ec8637c1e'
                },
                success: (res) => {
                    resolve(res.data.HeWeather6[0]);
                },
                fail: (err) => {
                    reject(err)
                }
            })     
        })
    },
    // 处理风力数据的格式，接收天气情况数据集，处理完后返回
    dealFl (data) {
        if (data) {
            data.forecast.forEach(ele => {
                const fl = ele.fengli;
                // 获取风力数据中的有效值
                ele.fengli = this.dealXml(fl);
            })
            data.yesterday.fl = this.dealXml(data.yesterday.fl);
        }
        return data;
    },
    // 解析 <![CDATA[3-4级]]> 这种数据，获取其中的值
    dealXml (fl) {
        const flArr = fl.split('[');
        const target = flArr[flArr.length - 1].split(']')[0];
        return target;
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