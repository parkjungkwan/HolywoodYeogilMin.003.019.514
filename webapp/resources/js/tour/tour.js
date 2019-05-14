"use strict";
var tour = tour || {};
tour = (()=>{
	let _,js,img,css,compojs,cityjs,utiljs, mainjs;
	let cont= x =>{
		tour.$.cont(x);
	};
	let init = ()=>{
		_ = $.ctx();
        js = $.js();
        img = $.img();
        css = $.css();
        compojs = js+"/comp/compo.js";
        cityjs = js+"/city/city.js";
        utiljs = js+"/main/util.js";
        mainjs = js+"/main/main.js";
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
			$(compo.tourist_area()).appendTo('#common_area');
			
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
			
			$.getScript(utiljs,()=>{
				$('.search_area').empty();
				$('<div id="custom-search-input">'
						+'    <div class="input-group col-md-12">'
						+'        <input type="text" id="city_search" class="search-query form-control" placeholder="도시명으로 검색">'
						+'        <span class="input-group-btn" style="width:auto">'
						+'            <button id="search_btn" class="btn btn-danger" type="button">'
						+'                <span class=" glyphicon glyphicon-search"></span>'
						+'            </button>'
						+'        </span>'
						+'    </div>'
						+'</div>').prependTo('.search_area');
				
				$('#search_btn').on('click',e=>{
					e.preventDefault();
					let search = $('#city_search').val();
					if($.fn.nullChecker([search])){
						alert('검색어를 입력해주세요.');
					}else{
						city_detail(search);
					}
				});
			});
			
			$('#area_top').css("background-image", "url('"+_+"/resources/img/component/bgb01.jpg')");
			$('#area_top_name_as').css("background", "url('"+_+"/resources/img/common/as.gif') no-repeat");
			$('#area_top_name_eu').css("background", "url('"+_+"/resources/img/common/eu.gif') no-repeat");
			
			$.getJSON(_+"/country/list",d=>{
				$.each(d.ls,(i,j)=>{
					if(j.continentName === "아시아"){
						let c = {x:j.countryName,y:j.countryEname};
						
						$('<a class="area_n_link">'+j.countryName+'&nbsp;<span>'+j.countryEname+'</span></a>')
						.addClass('cursor')
						.appendTo('#asia')
						.attr("data-tooltip-text","대만을 눌러주세요!")
						.attr('id',j.countryEname)
						.click(function (){
							if(j.countryName === "대만"){
								$.getScript(cityjs,()=>{
									city.onCreate(c);
								});
							}else{
								alert('대만을 눌러주세요');
							}
							
						});
					}else{
						$('<a class="area_n_link">'+j.countryName+'&nbsp;<span>'+j.countryEname+'</span></a>')
						.addClass('cursor')
						.appendTo('#europe')
						.attr("data-tooltip-text","대만을 눌러주세요!")
						.attr('id',j.countryEname)
						.click(function (){
							alert('대만을 눌러주세요');
						});;
					}
				});
				
			});
		});
	};
	let city_detail = (c)=>{
		$('#common_area').empty();
		$(compo.common_menu()).appendTo('#common_area');
		$('<b>'+c+'</b>').appendTo('.area_title');
		$.each(common_navi(),(i,j)=>{
			$('<a>'+j.text+'</a>')
			.appendTo('.common_menu')
			.addClass('cursor')
			.attr('name',j.name)
			.click(function(){
				let that = $(this).attr('name');
				switch(that){
				case 'home':
					$('.country_detail').remove();
					setContentView(c);
					break;
				case 'main_city':
					$('.country_detail').remove();
					$('.city_detail').remove();
					$(compo.tourist_main_city()).appendTo('#common_area');
					
					$('#taipai').addClass('cursor').click(()=>{
						city_detail();
						
						topten();
					});
					break;
				case 'tourist_city':
					$('.country_detail').remove();
					$('.city_detail').remove();
					$(compo.tourist_city()).appendTo('#common_area');
					$(compo.tourist_list()).appendTo('#common_area');

					break;
				case 'restaurant':
					$('.country_detail').remove();
					$('.city_detail').remove();
					$(compo.restaurant_city()).appendTo('#common_area');
					$(compo.tourist_list()).appendTo('#common_area');
						
					break;
				case 'shopping':
					$('.country_detail').remove();
					$('.city_detail').remove();
					$(compo.shopping_city()).appendTo('#common_area');
					$(compo.tourist_list()).appendTo('#common_area');
						
					break;
				case 'calendar':
					break;
				case 'map':
					
					break;
				}
			});
		});
		
		$('.country_detail').remove();
		$(compo.city_detail()).insertAfter('.silver');
		$('.area_nav').next().html('<b>타이베이</b>');
		$('<a class="nav_btn cursor"> > 타이베이</a>').appendTo('.area_nav');
		
		$('<img alt=""></img>')
		.attr("src",_+"/resources/img/component/taipai.jpg")
		.attr("width","624")
		.attr("height","369")
		.appendTo('.img_box');
		
		$.getJSON(_+'/crawling/weather',d=>{
			$('<img></img>')
			.attr("src",d.nowimg)
			.attr("width","80")
			.attr("height","90")
			.appendTo('.temp_left');
	
			$('.exchange_box input[data-no=1]').val(d.e.tai);
			$('.exchange_box input[data-no=2]').val(d.e.kor);
			$(function(){
				$('.exchange_box input[data-no=1]').on('keyup',function(){
					let exchange = ($('.exchange_box input[data-no=1]').val() * d.e.kor);
					$('.exchange_box input[data-no=2]').val(exchange.toFixed(2));
				});
			});
			$(function(){
				$('.exchange_box input[data-no=2]').on('keyup',function(){
					let e = (1/d.e.kor).toFixed(3);
					let exchange = ($('.exchange_box input[data-no=2]').val() * e);
					$('.exchange_box input[data-no=1]').val(exchange);
				});
			});
			$('<span>현지 날씨</span></br></br></br>'
					+'<h2 style="font-size: 30px">'+d.el+'°</h2>').appendTo('.temp_title');
			$.each(d.wlist,(i,j)=>{
				if(i<4){
					$(' <div class="item1">'+j.day+'</br>'
							+'<img src="'+j.imgUrl+'"> </br>'
							+'<div class="w-temp_value">'
							+'<span class="w-temp_max">'+j.htem+'°  '+j.ltem+'°</span>'
							+'</div></div>').appendTo('.w-grid-container');
				}
			});
		});
		$(compo.city_topten()).insertAfter('.city_detail');
	};
	let common_navi = ()=>{
		return [
			{name :"home",text :"홈"},
			{name :"main_city",text :"주요도시"},
			{name :"tourist_city",text :"관광명소"},
			{name :"restaurant",text :"음식점"},
			{name :"shopping",text :"쇼핑"},
			{name :"calendar",text :"여행일정"},
			{name :"map",text :"지도보기"}
			];
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
									location.assign(_+"/tour");
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
	return {init : init, cont:cont};
})();
tour.$= {
		cont: x=>{
			$.getScript(x+'/resources/js/router.js',()=>{
				$.extend(new Session(x));
				tour.init();
			})
		}
};