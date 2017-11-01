
function HTTP(){};

HTTP.get = function(url,parm){
// parm(对象) -> name=xxx&age=122
  var temp = [];
  for(var key in parm){
    temp.push(key+"="+parm[key]);
  }
  var parmString = temp.join("&");

  return new Promise(function(success,fail){
    wx.request({
      url: url+"?"+parmString,
      success: function (result) { 
        success(result);
      },
      fail: function (error) { 
        fail(error);
      }
    });
  });
}

HTTP.post = function () {

}

// 注意 必须添加HTTP 在模块对象上  添加 HTTP的属性
// 如果不添加  整个模块 是 HTTP 对象
module.exports.HTTP = HTTP;
module.exports.CCC = "23456";