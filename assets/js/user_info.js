// 表单校验自定义规则
layui.form.verify({
  nickname: [/^\w{1,6}$/, "长度在1-6之间"],
});
initUserInfo();
function initUserInfo() {
  $.ajax({
    method: "get",
    url: "/my/userinfo",
    success: function (res) {
      if (res.status != 0) return layui.layer.msg("获取信息失败");
      console.log(res);
      layui.form.val("form1", res.data);
    },
  });
}
//更新用户信息
$("#form1").submit(function (e) {
  e.preventDefault();
  $.ajax({
    method: "POST",
    url: "/my/userinfo",
    data: $(this).serialize(),
    success: function (res) {
      if (res.status != 0) return layui.layer.msg("更新失败");
      layui.layer.msg("更新成功");
    },
  });
});
//重置表单
$("#resetBtn").click(function (e) {
  e.preventDefault();
  initUserInfo(); //重新拿没有修改过的数据渲染表单上
});
