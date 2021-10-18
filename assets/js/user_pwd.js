$(function () {
  layui.form.verify({
    diffpwd: function (value, item) {
      if (value == $('[name="oldPwd"]').val()) {
        return "新旧密码不能一样";
      }
    },
    repwd: function (value, item) {
      if (value != $('[name="newPwd"]').val()) {
        return "两次密码不一致";
      }
    },
  });
  $("#form1").submit(function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/updatepwd",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status != 0) return layui.layer.msg("更新密码失败");
        layui.layer.msg("更新密码成功");
        localStorage.removeItem("token");
        window.parent.location.href = "/login.html";
      },
    });
  });
});
