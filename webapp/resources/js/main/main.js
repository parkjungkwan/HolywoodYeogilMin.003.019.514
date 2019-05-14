"use strict";
var main = main ||{};
main = (()=>{
	let _, js, css, img, compojs, tourjs, planjs, airportjs, utiljs;
	
	let init = ()=>{
		_ = $.ctx();
		js = $.js();
		css = $.css();
		img = $.img();
		compojs = js+"/comp/compo.js";
		tourjs = js+"/tour/tour.js";
		planjs = js+"/plan/plan.js";
		airportjs = js+"/reservation/airport.js";
		utiljs = js+"/main/util.js";
		onCreate();
	};
	
	let onCreate = ()=>{
		setContentView();
	};
	
	let setContentView = ()=>{
//==========================================메인 네비바
		$('#home').click(function(){
			location.assign($.ctx());
		});
		
		$('#tour').click(function(){
			location.assign($.ctx()+'/tour');
		});
		
		$('#plan').click(function(){
			location.assign($.ctx()+'/sche');
		});
		
		$('#reservation').click(function(){
				location.assign($.ctx()+'/reser');
		});
		if(!(sessionStorage.getItem('memberId') === '1073491307' || sessionStorage.getItem('memberId') === '1075836473')){
			$('#admin').hide();
		}else{
			$('#admin').click(function(){
				location.assign($.ctx()+'/admin');
			});
		}
//==================================================	
		$.getScript(compojs,()=>{
			$(compo.main_contents()).appendTo('#common_area');
			$('.more_btn').remove();
			$('.search_area').empty();
			$('.main_top').attr('style', 'background:url('+img+'/main/key_bg_3.jpg) no-repeat;background-size:cover;');
//===============================================			
			if(sessionStorage.getItem('session') === null){
				$('#custom-login-btn').click(function loginWithKakao() {
					login();
				});
			}else{
				$('.gnb_box').empty();
				$(compo.logon()).appendTo('.gnb_box');
				$('<img src="'+img+'/common/logon_img.png" style="width: 30px;">').prependTo('.dropdown-toggle ');
				$('#logout_btn').click(()=>{
					logout();
				});
			}
//================================================			
			$.getJSON(_+'/crawling/topCtry',d=>{
                $('#top_city_list').empty();
                $.each(d.ls, (i,j)=>{
                    $('<a href="#" class="top_city w2">'
                            +'<div class="top_city_title">'+j.imgName+'</div>'
                            +'<img src="'+j.imgUrl+'" alt="">'
                            +'</a>').appendTo('#top_city_list');
                });
            });
		});
	};
	let login = ()=>{
		Kakao.init('0b0fec75e07cb3ea427be11fe3287c3b');
		Kakao.Auth.login({
	    	  success: function(authObj) {
	              Kakao.API.request({
	                    url: '/v1/user/me',
	                    success: function(res) {
	                          Kakao.Auth.setAccessToken(authObj.access_token, true);
	                          sessionStorage.setItem('session', Kakao.Auth.getAccessToken());
	                          $.ajax({
	                              url:_+'/login',
	                              type: 'POST',
	                              data: JSON.stringify(res, authObj),
	                              dataType:'json',
	                              contentType : "application/json; charset=UTF-8",
	                              success:function(res){
	                                 location.assign(_);
	                                 sessionStorage.setItem('memberId', res.memberId);
	                                 sessionStorage.setItem('nickname', res.nickname);
	                                 sessionStorage.setItem('thumbnailImg', res.thumbnailImg);
	                              },
	                              error:function(err){
	                            	  login();
	                              }
	                          });
	                        }
	                      })
	         },
	         fail: function(err) {
	           alert(JSON.stringify(err));
	         }
	       });
		
	};
	let logout=()=>{
        sessionStorage.removeItem('session');
        sessionStorage.removeItem('memberId');
        sessionStorage.removeItem('nickname');
        sessionStorage.removeItem('thumbnailImg');
         location.assign($.ctx());
    };
	return {init:init, login:login, logout:logout}

	
})();

