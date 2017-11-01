// pages/detail/detail.js
var HTTP = require("../../tools/http/http.js").HTTP;
var app = getApp();
console.log(HTTP);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas: [],
    randActive:"randActive",
    orderActive:""
  },

  chooseQuestion:function(event){
    console.log(event);
    app.result = event.target.dataset.info;
  },

  loadData: function (testType) {
    wx.showLoading({
      title:"正在加载中...",
      mask:true
    });

    HTTP.get(app.API, { key: app.KEY, testType: testType, subject: this.parm.subject, model: this.parm.type }).then(function (result) {
      console.log(result);
      this.setData({
        datas: result.data.result
      });
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }.bind(this)).catch(function (error) {
      console.log(error);
      wx.hideLoading();
      wx.showLoading({
        title: "加载错误",
        mask: true
      });
      setTimeout(function(){
        wx.hideLoading();
      },3000);
    });
  },

  chooseType:function(event){
    this.type = event.target.dataset.type;
    this.setData({
      randActive: this.type=="rand"?"randActive":"",
      orderActive: this.type == "order" ? "orderAction" : ""
    });
    this.loadData(event.target.dataset.type);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.parm = options;
    this.type = "rand";
    this.loadData("rand");

  },

  onPullDownRefresh: function () {
    this.loadData(this.type);
  }
})