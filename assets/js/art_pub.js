$(function () {
  //分类数据不是写死的
  var layer = layui.layer;
  var form = layui.form;
  initCate();
  //初始化富文本编辑器
  initEditor();
  function initCate() {
    $.ajax({
      method: "GET",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("初始化文章分类失败");
        }
        //调用模板引擎,渲染分类的下拉菜单
        var htmlStr = template("tpl-cate", res);
        $("[name=cate_id]").html(htmlStr);
        form.render(); //layui内置
      },
    });
  }
  // 1. 初始化图片裁剪器
  var $image = $("#image");

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: ".img-preview",
  };

  // 3. 初始化裁剪区域
  $image.cropper(options);

  $("#btnChooseFile").click(function () {
    $("#file").click();
  });

  //给文件添加change事件 用户选好图片之后就会触发
  $("#file").change(function (e) {
    if (e.target.files.length == 0) {
      return layui.layer.msg("请选择图片");
    }
    var file = e.target.files[0];
    //图片的内容
    //URL.createObjectURL html5提供的api
    var newImgURL = URL.createObjectURL(file);
    //找到这个上传之后图片在内存中的地址
    console.log(newImgURL);
    $image
      .cropper("destroy")
      // 销毁旧的裁剪区域
      .attr("src", newImgURL)
      // 重新设置图片路径
      .cropper(options);
    // 重新初始化裁剪区域
  });
  var state = "已发布"; //默认认为用户点击的是发布按钮
  $("#sava2").click(function () {
    state = "草稿";
  });

  $("#form1").submit(function (e) {
    e.preventDefault();
    var fd = new FormData(this);
    fd.append("state", state);
    $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280,
      })
      .toBlob(function (blob) {
        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        console.log(blob);
        fd.append("cover_img", blob);
        fd.forEach((value, key) => console.log(value, key));
        //发送ajax
        $.ajax({
          method: "POST",
          url: "/my/article/add",
          data: fd,
          processData: false,
          contentType: false,
          success: function (res) {
            console.log(res);
            if (res.status != 0) {
              return layer.msg("发布文章失败");
            }
            layer.msg("发布文章成功");
            location.href = "/artcle/art_list.html";
          },
        });
      });
  });
});
