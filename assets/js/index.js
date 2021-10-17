$(function () {
  getUserInfo();

  //退出处理程序
  $("#btnout").on("click", function () {
    layer.confirm("是否要退出?", { icon: 3, title: "提示" }, function (index) {
      //要删除本地储存,跳转到登录页面
      localStorage.removeItem("token");
      location.href = "/login.html";
    });
  });
});
function getUserInfo() {
  $.ajax({
    methed: "GET",
    url: "/my/userinfo",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    success: function (res) {
      console.log(res);
      if (res.status != 0) return layui.layer.msg("获取用户信息失败");
      Radar(res.data);
    },
    // complete: function (res) {
    //   //不管成功还是失败都会执行
    //   console.log(res);
    //   if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败") {
    //     //1.强制清空token
    //     localStorage.removeItem("token");
    //     location.href = "/login.html";
    //   }
    // },
  });
}
function Radar(user) {
  var name = user.nickname || user.username;
  // var name = user.username || user.nickname;
  $("#welcome").text("欢迎" + name);

  if (user.user_pic !== null) {
    //3.1渲染图片头像
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    //3.2渲染文本头像
    $(".layui-nav-img").hide();
    var first = name[0].toUpperCase();
    $(".text-avatar").html(first).show();
  }
  console.log(name.toUpperCase());
}
