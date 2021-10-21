//定义美化时间的过滤器
template.defaults.imports.dataFormat = function (date) {
  const dt = new Date(date);
  var y = dt.getFullYear();
  var m = (dt.getMonth() + 1).toString().padStart(2, "0");
  var d = dt.getDate().toString().padStart(2, "0");

  var hh = dt.getHours().toString().padStart(2, "0");
  var mm = dt.getMinutes().toString().padStart(2, "0");
  var ss = dt.getSeconds().toString().padStart(2, "0");

  return `${y}年${m}月${d}日 ${hh}时:${mm}分:${ss}秒`;
};

var q = {
  pagenum: 1, //当前页
  pagesize: 2, //每页数量
  cate_id: "", //分类的id 科技 教育 财经
  state: "", // 草稿 已发布 邮箱
};
initTable();
var len;
initCate();
function initTable() {
  $.ajax({
    method: "GET",
    url: "/my/article/list",
    data: q,
    success: function (res) {
      console.log(res);
      if (res.data && res.data.length > 0) {
        len = res.data.length;
      }
      if (res.status != 0) {
        return layui.layer.msg("获取数据失败");
      }
      //把数据和模板结合在一起
      var str = template("tpl1", res);
      $("#listBox").html(str);
      renderPage(res.total);
    },
  });
}
function renderPage(total) {
  console.log(total);
  layui.laypage.render({
    elem: "test1", //注意,这里是 test1是id,不用加#号
    count: "total", //数据总数,从服务端得到
    limit: q.pagesize, //每一页条数
    limits: [1, 2, 3, 4], //设置当前页显示几条数据
    layout: ["count", "limit", "prev", "page", "next", "skip"], //设置有哪些控件
    curr: q.pagenum,
    jump: function (obj, first) {
      console.log(obj);
      console.log(first);
      q.pagenum = obj.curr;
      q.pagesize = obj.limit;
      if (!first) {
        initTable();
      }
    },
  });
}
function initCate() {
  $.ajax({
    method: "GET",
    url: "/my/article/cates",
    success: function (res) {
      if (res.status !== 0) return layer.msg("初始化文章分类失败");
      var htmlStr = template("tpl-cate", res);
      $("[name=cate_id]").html(htmlStr);
      layui.form.render();
    },
  });
}

$("#form-search").submit(function (e) {
  e.preventDefault();
  q.cate_id = $("[name=cate_id]").val();
  q.state = $("[name=state]").val();
  initTable();
});
$("body").on("click", ".btn-delete", function () {
  layui.layer.confirm("确定要删除吗?", () => {
    console.log($(this).attr("data-id"));
    var id = $(this).attr("data-id");
    $.ajax({
      method: "GET",
      url: `/my/article/delete/${id}`,
      success: function (res) {
        if (res.status != 0) {
          return layer.msg("删除文章失败!");
        }
        layer.msg("删除文章成功");
        if (len == 1) {
          q.pagenum = q.pagenum - 1;
          if (q.pagenum == 0) {
            q.pagenum = 1;
          }
        }
        initTable();
      },
    });
  });
});
