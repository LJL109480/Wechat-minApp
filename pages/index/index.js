// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:'xxxx',
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    this.getHandleUserInfo()
  },
  //获取到用户和的登陆信息
  getHandleUserInfo(){
    wx.getUserInfo({
      success:(data)=> {
        console.log(data)
        this.setData({
          userInfo:data.userInfo
        })
      },
      fail(err) {
        console.log(err)
      }
    })
     
  },

   getUserInfo(data){
    if(data.detail.rawData){ //用户允许获取信息
      this.getHandleUserInfo()
    }
   },
   handleParent() {
     wx.switchTab({
       url: '/pages/list/list',
       success(){
         console.log('跳转成功')
       }
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