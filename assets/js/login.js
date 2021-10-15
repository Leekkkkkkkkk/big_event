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

  //表单验证
  layui.form.verify({
    pwd: [/^\S{6,12}$/, "密码长度是6-12位非空格组成"],
    repwd: function (value, item) {
      if (value != $(item).parent().prev().find("input").val()) {
        return "两次密码输入不一致";
      }
    },
  });

  //登录注册
  $("#form_reg").submit(function (e) {
    e.preventDefault(); //阻止默认行为
    $.post('http://api-breakingnews-web.itheima.net/api/reguser', {
      username: $("#reg_username").val(),
      password: $("#reg_password").val(),
    },function(res){
      if(res.status != 0) return layui.layer.msg(res.message);
      layui.layer.msg('注册成功')
      $('#link_login').click()
    });
  });
});
