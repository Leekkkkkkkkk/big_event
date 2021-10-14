$(function () {
  $("#link_reg").click(function () {
    $(".login-box").hide();
    $(".reg-box").show();
    console.log(1);
  });
  $("#link_login").click(function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });
});
layui.form.verify({
  pwd: [/^\S{6,12}$/, "密码长度是6-12位非空格组成"],
  repwd: function (value, item) {
    if (value != $(item).parent().prev().find("input").val()) {
      return "两次密码输入不一致";
    }
  },
});
