"use strict";
var mypage = mypage || {};
mypage = (()=>{
	let _,js,compojs,img;
	let init=()=>{
		_ = $.ctx();
		js = $.js();
		img = $.img();
		compojs = js+'/comp/compo.js';
		onCreate();
	};
	let onCreate=()=>{
		setContentView();
	};
	let setContentView=()=>{
		$.getScript(compojs,()=>{
			$('#common_area').empty();
			$(compo.mypage_sche()).appendTo('#common_area');
			$('#my_top_menu').empty();
			
			if(sessionStorage.getItem('thumbnailImg')==='default_img'){
				$('.my_img').attr("src",img+"/common/default_img.png");
			}else{
				$('.my_img').attr("src",sessionStorage.getItem('thumbnailImg'));
			}
			$('.my_name').text(sessionStorage.getItem('nickname'));
			$('.pn_list_user').text(sessionStorage.getItem('nickname'));
			
			memAllSche();
			
		});
	};
	let memAllSche =()=>{
		let id = sessionStorage.getItem('memberId');
		$.getJSON(_+'/memAllSchedules/'+id,d=>{
			$('.plan_inner').empty();
			$.each(d.list, (i,j)=>{
				$('<a href="#" class="box" target="_self">'
						+'	<div class="btn_del" onclick="del_plan(283932)">'
						+'		<img src="/res/img/mypage/common/btn_delete.png" alt="">'
						+'	</div>'
						+'	<div class="plan_hidden_btn">상세일정 보기</div>'
						+'	<div class="plan_bg">'
						+'		<div class="plan_bg_inner">'
						+'			<span>나라</span>'
						+'			<span style="margin-left:10px;color:#b4b4b4;">'+j.MS_COUNTRY_NAME+'</span>'
						+'			<br>'+j.MS_TITLE
						+'		</div>'
						+'	</div>'
						+'	<div class="plan_img_box">'
						+'		<img src="'+j.IMG_URL+'" alt="" class="plan_img">'
						+'	</div>'
						+'	<div class="plan_bg_inner2">'
						+'		<span></span>'
						+'		<div class="fr pn_list_copy_icon">0</div>'
						+'		<div class="fr pn_list_view_icon">12</div>'
						+'		<div class="fr pn_list_spot_icon"></div>'
						+'		<div class="clear"></div>'
						+'		<div class="pn_list_city"></div>'
						+'		<div class="clear"></div>'
						+'		<div class="pn_list_user">'+j.NICKNAME+'</div>'
						+'	</div>'
						+'</a>').appendTo('.plan_inner')
						.click(function(){
							mysche.init(j.MS_TITLE);
						});
			});
		});
	};
	return {init:init, memAllSche:memAllSche};
})();