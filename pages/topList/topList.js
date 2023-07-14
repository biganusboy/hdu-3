// pages/topList.js
import PubSub from 'pubsub-js';
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: '',//年
    month: '',//月
    day: '',//天
    topList: [],//推荐列表数据
    getMyListUid: 0,
    index: 0//音乐下标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    let getMyListUid = options.getMyListUid
    let nowTime = new Date();
    //更新日期
    this.setData({
      day: nowTime.getDate(),
      month: nowTime.getMonth() + 1,
      year: nowTime.getFullYear()
    })

    //获取每日推荐的数据
    if(getMyListUid == 0){
      this.getTopList();
    }
    else{
      this.getMyList();
    }
    console.log(getMyListUid);

    //订阅来自songDetail页面发布的消息
    PubSub.subscribe('switchMusic',(msg,type) => {
      let {topList,index} = this.data;
      if(type === 'pre'){//上一首
        (index === 0) && (index = topList.length);
        index -= 1;
      }else{//下一首
        (index === top.length - 1) && (index = -1);
        index += 1;
      }

      //更新下标
      this.setData({
        index: index
      })

      let musicId = recommendList[index].id;
      //将音乐id回传给songDetail页面
      PubSub.publish('musicId',musicId);
    })

  },

  async getTopList(){
    let topListData = await request('/toplist',{limit:10});

    console.log(topListData);

    this.setData({
      topList: topListData.list
    })
  },
  async getMyList(){
    let topListData = await request('/user/playlist',{uid: this.data.getMyListUid,type: 0});

    console.log(topListData);

    this.setData({
      topList: topListData.playlist
    })
  },

  toTopListDetail(event){
    let {list} = event.currentTarget.dataset;

    console.log(list.id);

    wx.navigateTo({
      url: '/pages/playlist/playlist?id=' + list.id
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})