//发送ajax请求获取数据
$(function () {

  //获取couponid
  var serStr = new UrlSearch();
  var couponid = serStr.couponId;
  console.log(couponid);

  var info;


  function render() {

    $.ajax({
      type: 'get',
      dataType: 'json',
      data: {
        couponid: couponid
      },
      url: 'http://127.0.0.1:9090/api/getcouponproduct',
      success: function (info) {

        console.log(info);
        $('.ken_info').html(template('coup_tpl', info));
        // info = info;
        var infoLength = info.result.length;

        $(".ken_info ").on("click", "li", function () {
          console.log(info);

          var index = $(this).index();
          var img1 = info.result[index].couponProductImg;
          $(".mm_mask").css("display", "block");
          $(".mm_mask .pic").html(img1);
          $(".mm_mask .arrow_right").on("click", function () {
            if (index < infoLength - 1) {
              index++;
              img1 = info.result[index].couponProductImg;
              $(".mm_mask .pic").html(img1);
            }
            return false;
          })
          $(".mm_mask .arrow_left").on("click", function () {
            if (index > 0) {
              index--;
              img1 = info.result[index].couponProductImg;
              $(".mm_mask .pic").html(img1);
            }
            return false;
          })
        })

      }
    });

  }

  render();





});