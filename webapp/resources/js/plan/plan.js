"use strict";
var plan = plan||{};
plan =(()=>{
	let _, js, css, compojs, img, mainjs;
	let cont= x =>{
		plan.$.cont(x);
	};
	let init=()=>{
		_ = $.ctx();
		js = $.js();
		css = $.css();
		img = $.img();
		compojs = js+'/comp/compo.js';
		mainjs = js+'/main/main.js';
		onCreate();
	};
	let onCreate=()=>{
		setContentView();
	};
	let setContentView=()=>{
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
		$('#jw_css').remove();
		$.getScript(compojs,()=>{
			$('#common_area').empty();
			
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

			$(compo.plan_header()).appendTo('#common_area');
			
			$('#p_header_img').attr('src',img+'/component/p_header_img_ko.jpg');
				// 이미지 바꾸기
			$('.p_header_btn_box').empty();
				// 모달 삭제
			$('<div class="p_header_btn" id="btn_1">')
				.appendTo('.p_header_btn_box').text('새로운 일정 만들기')
				.click(function(){
//*************************************************css end
					if(sessionStorage.getItem('session') === null){
						login();
					}else{
						sche.init();
					}
				});
			$('<img/>').attr('src',img+'/component/p_header_btn_img1.jpg').appendTo('#btn_1');
			
			$('<div class="p_header_btn" id="btn_2">')
				.appendTo('.p_header_btn_box').text('나의 일정 보기')
				.click(function(){
					if(sessionStorage.getItem('session') === null){
						login();
					}else{
						mypage.init();
					}
				});
			
			$('<img/>').attr('src',img+'/component/p_header_btn_img2.jpg').appendTo('#btn_2');
			
			$(compo.plan_content()).appendTo('#common_area');
			$('#area_btn').attr('src',img+'/component/area_down.jpg');
			$('#city_btn').attr('src',img+'/component/area_down.jpg');
			//안나와 아이콘
			/*$('#p_header_hide_bg').attr('src',img+'/component/hide_bg.jpg');
			$('#pgn-nx2').attr('src',img+'/component/pg_last.png');
			$('.pn_list_spot_icon').attr('src',img+'/component/pn_list_spot_icon.png');*/
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
								location.assign(_+"/sche");
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
		location.assign(_);
	};
	return {init:init,cont:cont, login:login};
})();

plan.$= {
		cont: (x)=>{
			$.getScript(x+'/resources/js/router.js',()=>{
				$.extend(new Session(x));
				plan.init();
			})
		}
};