// first.js
Page({

  /**
   * 页面的初始数据
   */
  ctx:"",
  color:"black",
  mouse_x:0,
  mouse_y:0,
  mouseX:0,
  mouseY:0,
  colorArr:["red","orange","yellow","green","cyan","blue","purple"],
  //类型 线  圆  矩形
  type:"line",
  data: {
    array: ["赤", "橙", "黄", "绿","青","蓝","紫"],
    width:5

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.ctx = wx.createCanvasContext("board");
    //设置线条颜色
    this.ctx.setStrokeStyle("black");
    //设置线条粗细
    this.ctx.setLineWidth(this.data.width);
  },


  
  

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

    this.ctx = null;
    this.color=null;
    this.mouse_x=null;
    this.mouse_y=null;
    this.mouseX=null;
    this.mouseY=null;
    this.type=null
  },

  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '趣画画',
      path: '/pages/first/first',
      imageUrl:'../../imgs/my.png',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  /**
   * 开始触摸
   */
  start:function(ev){

     this.mouse_x = ev.touches[0].x;
     this.mouse_y = ev.touches[0].y;
    
    //画线
    if(this.type == "line"){
    this.ctx.moveTo(this.mouse_x,this.mouse_y)
    }

  },
  
  /**
   * 移动
   */
  move: function (ev) {
    this.mouseX = ev.touches[0].x;
    this.mouseY = ev.touches[0].y;
     

    if(this.type == "line")
    { 
    //设置终点  鼠标当前移动的位置
    this.ctx.lineTo(this.mouseX, this.mouseY);
    
    this.ctx.stroke();
    this.ctx.draw(true)

    this.ctx.moveTo(this.mouseX, this.mouseY);
    }


  },

  /**
   * 触摸结束
   */ 
  end:function(ev){

    var x1 = this.mouse_x;
    var y1 = this.mouse_y;
    var x2 = this.mouseX;
    var y2 = this.mouseY;
    if(this.type === "arc"){
    if(x2<1&&y2<1){
      return
    } 
    //r^2 = x^2 + y^2
    var x = Math.pow(x2-x1,2);

    var  y = Math.pow(y2 - y1, 2);
   //半径 
    var r = Math.sqrt(x + y);
   
    console.log(r)

    this.ctx.save();
    this.ctx.beginPath()
    this.ctx.arc(x1,y1, r, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.restore();
    this.ctx.draw(true);
    
    //还原设置
    this.mouse_x = 0;
    this.mouse_y = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.type = "line";
    }else if(this.type === "rect"){
      this.ctx.restore();
      this.ctx.beginPath();
      console.log("x1=="+x1+",y1=="+y1+"x2===="+x2+",y2===="+y2)
       this.ctx.strokeRect(x1,y1,Math.abs(x2-x1),Math.abs(y2-y1))
        this.ctx.draw(true);
        this.type = "line" 
    }


  },



  /**
   * 橡皮擦
   */ 
  wrap:function(){

    this.ctx.setStrokeStyle("ghostwhite")
  },


  /**
   * 尺寸
   */
  size:function(e){
    var that = this;
    let value = e.detail.value;
    
    that.ctx.setLineWidth(value);
  },
 /**
  * 颜色
  */
  selectColor:function(e){
    var that = this;
    let index = e.detail.value;
    
    that.ctx.setStrokeStyle(that.colorArr[index])

  },

  /**
   * 清空
   */
  clear:function(){
    var that = this;

    wx.getSystemInfo({
      success: function(res) {
        var width = res.screenWidth;
        var height = res.screenHeight;       
       that.ctx.clearRect(0,0,width,height)
       that.ctx.draw();
      

      }
    })
  },

  /**
   * 画圆
   */
  circle:function(){
    this.type = "arc";
  
  },
  /**
   * 画矩形
   */
  rect:function(){
    this.type = "rect"
    console.log("haha")
  }
  
})