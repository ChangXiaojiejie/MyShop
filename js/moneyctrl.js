
$(function () {

  var currPage = 0;
  var maxPage ;

  //发送ajax请求，获取数据
  function render(page) {
    
    $.ajax({
      type:'get',
      url:'http://127.0.0.1:9090/api/getmoneyctrl',
      data:{
        pageid : page || 0
      },
      dataType:'json',
      success:function (info) {
        
        console.log(info);
        // 绑定商品信息渲染
        $('.mp_list ul').html(template('pro_tpl',info));

        //计算最大的的分页
        maxPage = Math.ceil(info.totalCount/info.pagesize);
        console.log(maxPage);
        
        //绑定分页标签
        $('#page').html(template('page_tpl',{
          currPage: currPage,
          maxPage:maxPage
        }));





      }
    });
    
  }
  render();

  //上一页
  $('.pro_page').click(function () {
    
    // console.log('上一页');
    currPage--;
    if(currPage<1){
      currPage = 1;
      alert('小主，前方无路了');
    }
    render(currPage);
  });


  //下一页
  $('.next_page').click(function () {
    
    // console.log('下一页');
    currPage++;
    if(currPage>maxPage-1){
      currPage = maxPage-1;
      alert('小主，数据已走到尽头了');
    }
    render(currPage);
  });

  //下拉框切换

  $('#page').on('change',function () {
    
    var val = $(this).val();

    currPage = val;
    render(currPage);
    console.log(val);
    
    
  })




  
  
})