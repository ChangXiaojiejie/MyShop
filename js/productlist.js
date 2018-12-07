
$(function () {
  var currPage = 1;
  var maxPage ;
  var opts ;
  console.log(opts);
  
  
  //1.接收并获取地址栏中的categoryid=0

  //封装获取地址栏中参数的方法
  var urlSer = new UrlSearch();
  console.log(urlSer.categoryid);


  //发送ajax请求
  function render(page) {

    $.ajax({
      type:'get',
      data:{
        categoryid:urlSer.categoryid
      },
      dataType:'json',
      url:'http://127.0.0.1:9090/api/getcategorybyid',
      success:function (info) { 
        console.log(info);
        //设置分类名称
        var htmlStr = template('pro_name_tpl',info);
        $('.pro_name').html(htmlStr);
        var category = info.result[0].category;
        console.log(category);

        // 发送ajax请求
        $.ajax({
          type:'get',
          data:{
            categoryid :urlSer.categoryid,
            pageid : page || 1
          },
          url:'http://127.0.0.1:9090/api/getproductlist',
          dataType:'json',
          success:function (info) {
            
            console.log(info);

            //渲染商品数据模板
            var htmlStr = template('ductlist_tpl',info);
            $('.mm_product_list .list_info ul').html(htmlStr);

            //获取最大页数
            maxPage = Math.ceil(info.totalCount / info.pagesize);
            console.log(maxPage);

            var pageHtml = template('page_tpl',{
              currPage : currPage,
              maxPage : maxPage
            });
            $('#page').html(pageHtml);

            
          }
        });
        
        // console.log(info.);
        
        
      }
    });
  }
  render();


  //上一页和下一页
  $('.pro_page').click(function () {
    
    currPage--;

    if(currPage<1){
      alert('已经是第一页了');
      currPage = 1;
    }
    //渲染页面
    render(currPage);
    //修改页码
    // opts.eq(currPage-1).prop('selected',"selected").siblings().removeClass('selected');
   
  });

  //下一页
  $('.next_page').click(function () {
    
    currPage++;

    if(currPage>maxPage){
      alert('已经是最后一页了');
      currPage = maxPage;
    }
    
    render(currPage);
    // opts.eq(currPage-1).prop('selected',"selected").siblings().removeClass('selected');
  });


  //注册下拉框改变事件
  $('#page').on('change',function () {
    

    console.log('触发');

    var val = $(this).val();
    console.log(val);
    
    currPage = val;

    render(currPage);
    
    
  })








  
});