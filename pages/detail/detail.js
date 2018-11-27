// pages/detail/detail.js
let detailData = require('../../datas/list-data.js')
let appData = getApp()
console.log(appData)
console.log(detailData)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detaObj:{},
    iscollection:false,
    isPlayMusic:false,
    isShare:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = options.index
    this.setData({
      detaObj: detailData.list_data[index],
      index
    });
    //判断文章是否被收藏，如果被收藏渲染页面时读取缓存数据
    let oldStorage = wx.getStorageSync('iscollection')
    if (oldStorage[index]){
      this.setData({
        iscollection:true
      })
    };
    //判断当前页面是否在播放音乐
    if (appData.data.isPlay && appData.data.detaIndex === index){
      this.setData({
        isPlayMusic: true
      })
    }
    //监听页面音乐受否播放暂停
    wx.onBackgroundAudioPlay( () => {
      console.log('音乐播放')
      this.setData({
        isPlayMusic:true
      })
      appData.data.isPlay=true;
      appData.data.detaIndex = index;
    })
    //监听页面音乐受否播放暂停
    wx.onBackgroundAudioPause( () => {
      console.log('音乐暂定') 
      this.setData({
        isPlayMusic: false
      })
    })
    appData.data.isPlay = false;

  },
  //处理收藏缓存和高亮显示切换
  showCollection(){
    let iscollection = !this.data.iscollection
    this.setData({
      iscollection
    })
    console.log(iscollection)
    let title = this.data.iscollection?"收藏成功":"取消收藏"
    wx.showToast({
        title
    })
    //将数据缓存到用户本地，已知的标识是index
    let index = this.data.index;
    console.log(index)
    let obj = wx.setStorageSync('iscollection');
    obj=obj?obj:{};
    obj[index] = iscollection;
    wx.setStorage({
      key:'iscollection',
      data: obj
    })
  },
  //处理音乐播放和暂定
  handleMuic(){
    let isPlayMusic = !this.data.isPlayMusic
    this.setData({
      isPlayMusic
    })
    let { dataUrl, title } = this.data.detaObj.music
    //监视音乐播放
      if(isPlayMusic){
        wx.playBackgroundAudio({
        dataUrl,
        title
        })
      }else{
        wx.pauseBackgroundAudio()
      }
 
  },
  //处理是否分享
  showShare(){
    let isShare = !this.data.isShare
    this.setData({
      isShare
    })
    wx.showActionSheet({
      itemList: ['分享到朋友圈', '分享给朋友', '分享到微博'],
       
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