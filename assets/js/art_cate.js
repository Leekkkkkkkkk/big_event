initArtCateList();
// 获取文章分类的列表
function initArtCateList() {
  $.ajax({
    method: "GET",
    url: "/my/article/cates",
    success: function (res) {
      console.log(res);
      var str = template("tpl1", res);
      $("#cateList").html(str);
    },
  });
}
$(function () {
  var index;
  $("#addBtn").click(function () {
    index = layui.layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: `
      <form class="layui-form" id="form-add">
      <div class="layui-form-item">
        <label class="layui-form-label">分类名称</label>
        <div class="layui-input-block">
          <input type="text" name="name" required  lay-verify="required" placeholder="请输入分类名称" autocomplete="off" class="layui-input">
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">分类别名</label>
        <div class="layui-input-block">
          <input type="text" name="alias" required  lay-verify="required" placeholder="请输入分类别名" autocomplete="off" class="layui-input">
        </div>
      </div>
      <div class="layui-form-item">
        <div class="layui-input-block">
          <button class="layui-btn" lay-submit lay-filter="formDemo">确认添加</button>
          <button type="reset" class="layui-btn layui-btn-primary">重置</button>
        </div>
      </div>
    </form>
      `,
    });
  });
  // 通过代理的形式，为 form-add 表单绑定 submit 事件
  $("body").on("submit", "#form-add", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("新增分类失败！");
        }
        initArtCateList();
        layer.msg("新增分类成功！");
        layui.layer.close(index);
      },
    });
  });
  var index1;
  $("#cateList").on("click", ".btn-edit", function () {
    index1 = layui.layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "修改文章分类",
      content: `
      <form class="layui-form" id="form-edit" lay-filter="form-edit">
      <div class="layui-form-item">
        <input type="hidden" name="Id" />
        <label class="layui-form-label">分类名称</label>
        <div class="layui-input-block">
          <input type="text" name="name" required  lay-verify="required" placeholder="请输入分类名称" autocomplete="off" class="layui-input">
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">分类别名</label>
        <div class="layui-input-block">
          <input type="text" name="alias" required  lay-verify="required" placeholder="请输入分类别名" autocomplete="off" class="layui-input">
        </div>
      </div>
      <div class="layui-form-item">
        <div class="layui-input-block">
          <button class="layui-btn" lay-submit lay-filter="formDemo">确认添加</button>
          <button type="reset" class="layui-btn layui-btn-primary">重置</button>
        </div>
      </div>
    </form>
      `,
    });
    var id = $(this).parent().attr("data-id");
    console.log(id);
    $.ajax({
      method: "GET",
      url: "/my/article/cates/" + id,
      success: function (res) {
        layui.form.val("form-edit", res.data);
      },
    });
  });
  ``;
  $("body").on("submit", "#form-edit", function (e) {
    e.preventDefault();
    console.log(123);
    $.ajax({
      method: "POST",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg("更新分类失败!");
        layer.msg("更新分类数据成功!");
        layer.close(index1);
        initArtCateList();
      },
    });
  });
  //删除功能
  $("#cateList").on("click", ".btn-delete", function () {
    var id = $(this).parent().attr("data-id");
    layui.layer.confirm("确定要删除吗?", function () {
      $.ajax({
        method: "GET",
        url: "/my/article/deletecate/" + id,
        success: function (res) {
          if (res.status !== 0) return layer.msg("删除分类数据失败!");
          layer.msg("删除分类成功!");
          initArtCateList();
        },
      });
    });
  });
});
