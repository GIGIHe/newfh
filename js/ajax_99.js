$(function() {
	var timer;
	//表单提交
	$("#dosubmit").click(function(){
		var name = $("#name").val();
		var phone = $("#phone").val();
		var yzm = $("#yzm").val();
		var fb = $("#xuexiao").val();
		var fenxiao = $("#fenxiao").val();
		var geneal = $("#geneal").val();
		var data_source = "面试峰会pc"
		if (name == '') {
			alert('请输入姓名');
			return false;
		}
		var name_re = /^[\u4e00-\u9fa5]{0,}$/;
		if (!name_re.test(name)) {
			alert('请输入正确的姓名');
			return false;
		}
		if (phone == '') {
			alert('请输入手机号');
			return false;
		}
		var phone_re = /^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[0-9]{1}\d{8}$|^18[\d]{9}$|^19[\d]{9}$/;
		if (!phone_re.test(phone)) {
			alert('请输入正确的手机号');
			return false;
		}
		if (yzm == '') {
			alert('请输入手机验证码');
			return false;
		}
		$.ajax({
            url: "http://zg99.offcn.com/index/biaodan/register?actid=6618&callback=?",
            type: 'GET',
            dataType: 'jsonp',
            jsonp: "callback",
            data: { name: name, phone: phone, yzm: yzm,fb:fb,geneal:geneal,fenxiao:fenxiao,data_source:data_source},
            success: function(data) {
                if (data.status == 1) {
					alert("预约成功！")
					localStorage.setItem("phone", phone);
                    return false;
				} else {
                    alert(data.msg);
                    return false;
				}
			}
		});
	});
	$(".btn").click(function(){
		var phone1 = localStorage.getItem("phone");
		$.ajax({
            url: "http://zg99.offcn.com/index/biaodan/getphonestatus?actid=6618&callback=?",
            type: 'GET',
            dataType: 'jsonp',
            jsonp: "callback",
            data: { phone: phone1},
            success: function(data) {
                if (data.status == 1) {
					$(".dh").val(phone1)
					$(".mask,.zg_frame").show()
                    return false;
				} else if(data.status == 3 || data.status == 2) {
					alert('请先完善信息')
                    $("html , body").animate({scrollTop:$("#m4").offset().top-80+'px'},600);
                    return false;
				}
			}
		});
	})
	var zk = function(item, target) {
		if(item == target) {
			return true
		} else {
			return false
		}
	}
	$(".stbtn").click(function(){
		var flag=false
		var zkzh = $(".zkzh").val()
		var tel = $(".dh").val()
		  var zkz1 = zkzh.slice(0,3)
        	var reg1 = /^\d{15}$/;
            $.each(data,function(itx,obj){
                let obj1 = obj.item.slice(0,3)
                if(zk(obj1,zkz1)){
                    flag = true
                }
            })
            if (zkzh == '') {
                alert('请填写准考证号');
                return false;
            }
            if(!flag){
                alert("请填写正确的准考证号")
                return false;
            }
            if (!reg1.test(zkzh)) {
                alert('请填写正确的准考证号');
                $('#zkz').val('');
                return false;
			}
			$.ajax({
				url: "http://zg99.offcn.com/index/biaodan/register?actid=6618&callback=?",
				type: 'GET',
				dataType: 'jsonp',
				jsonp: "callback",
				data: {phone:tel,zkzh:zkzh},
				success: function(data) {
					if (data.status == 1) {
						alert("预约成功！")
						localStorage.setItem("phone", tel);
						$(".suc").fadeIn()
						return false;
					}else if(data.status == 2){
						alert("预约失败！")
						$(".mask,.zg_frame").fadeOut()
						$("html , body").animate({scrollTop:$("#m4").offset().top-80+'px'},600);
					}else {
						alert(data.msg);
						$(".mask,.zg_frame").fadeOut()
						return false;
					}
				}
			});
	})
    //获取验证码
	$("#getyzm").click(function(){
		var phone = $("#phone").val();
		if (!phone) {
			alert('请输入手机号');
			return false;
		}
		var phone_re = /^0?1[3456789]\d{9}$/;
		if (!phone_re.test(phone)) {
			alert('请输入正确的手机号');
			return false;
		}
		$.ajax({
			url: 'http://zg99.offcn.com/index/biaodan/sendmsg?actid=6618&callback=?',
			type: 'GET',
			dataType: 'jsonp',
			data: {phone: phone},
			success: function(data) {
				if (data.status=="1") {
					//alert('正在发送请稍后...');
					alert('正在发送请稍后...');
					var sec = 60;
					$("#getyzm").text(sec+'s后重试');
					 timer = setInterval(function (){
						sec--;
						$("#getyzm").text(sec+'s后重试');
						if (sec<1) {
							$("#getyzm").text('获取验证码');
							clearInterval(timer);
						}
					}, 1000);
				} else {
					//alert(data.msg);
					alert(data.msg);
				}
			}
		});
	});
})