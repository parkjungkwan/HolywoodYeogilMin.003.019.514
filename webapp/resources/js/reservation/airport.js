var airport = airport || {};
airport = (()=>{
		let _, js, css, img, compojs, hoteljs;
		let ext= x =>{
			airport.$.ext(x);
		};
		let init = ()=>{
			_ = $.ctx();
			js = $.js();
			css = $.css();
			img = $.img();
			compojs = js+'/comp/compo.js';
			hoteljs = js+'/reservation/hotel.js';
			onCreate();
		};
		let onCreate=()=>{
			setContentView();
		};
		let setContentView =()=>{
			default_view();
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
			$('.ej_css').remove();
			$('.cj_css').remove();
			$('.jw_css').remove();
			let sw_css = 
//항공
			  '<meta charset="utf-8">'
			  +'<meta http-equiv="X-UA-Compatible" content="IE=edge">'
			  +'<meta name="viewport" content="width=device-width, initial-scale=1">'
			  +'<link href="https://fonts.googleapis.com/css?family=PT+Sans:400" rel="stylesheet">'
			  +'<link class="sw_css" rel="stylesheet" href="'+css+'/common/bootstrap.min.css" />'
			  +'<link class="sw_css" rel="stylesheet" href="'+css+'/common/style.css" />'
			  +'<link class="sw_css" rel="stylesheet" href="'+css+'/common/arstyle.css" />'
//어스토리
			  +'<link class="sw_css" rel="stylesheet" href="'+css+'/common/web/default_ko.css" />'
			  +'<link class="sw_css" rel="stylesheet" href="'+css+'/common/web/gnb.css" />'	
			  +'<link class="sw_css" rel="stylesheet" href="'+css+'/component/default.css" />'
			  +'<link class="sw_css" rel="stylesheet" href="'+css+'/component/reset.css" />'	
			  +'<link class="sw_css" rel="stylesheet" href="'+css+'/web/main.css" />'
			  +'<link class="sw_css" rel="stylesheet" href="'+css+'/web/date_picker.css" /> ';
			$(sw_css).appendTo('head');
		};
		
		let default_view=()=>{
			$.getScript(compojs, ()=>{
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
				$('#common_area').css("background-image", "url('"+_+"/resources/img/background.jpg')");
				$(compo.reservation()).appendTo('#common_area');
				$('<button id="hbtn_01" class="btn btn-danger">호텔</button>').prependTo('#apbtn_01');
				$('<button id="abtn_01" class="btn btn-danger">항공</button>').prependTo('#apbtn_01');
				$('#start_01').text("출발지");
				$('#dest_01').text("도착지");
				$('#start_02').text("가는날");
				$('#dest_02').text("오는날");
				$('#adults_01').text("성인");
				$('#children_01').text("영/유아");
				$('#rank_01').text("좌석등급");
				$('#areser_01').text("예약 및 결제하기");
				
				$('#abtn_01').click(()=>{
					setContentView();
				});
				$('#hbtn_01').click(()=>{
					$.getScript(hoteljs, ()=>{
					hotel.init();
					});
				});
				 
				$('#asmbtn_01').text("항공권검색").click(function(e){
					 e.preventDefault();
					 let data = {arrivalDate:$('#sinput_03').val(),
								departDateR:$('#sinput_04').val()};//map자체
						if(data.arrivalDate===""||data.departDateR===""){
							alert("모든항목을 기입해주세요");
						}else{
					 let page ='1';
					 $.getJSON($.ctx()+'/airlist/'+ page, d=>{
						 $('<div id="adddiv_01"></div>').appendTo('#common_area');
						 $('#adddiv_01').empty();
						 $('<div><h1 id="addpro" style="font-size: 30px;text-align: center;"> 검색하신 항공편 입니다.</h1></br></br>'
								 +'<br><br><div class="grid-container">'
								 +'	<div class="item1">가는 항공편</br></br></br></div>'
								 +'	<div class="item2">오는 항공편</br></br></br></div>'
								 +'</div></div>').appendTo('#adddiv_01');
						 $.each(d.al,(i,j)=>{
							 $('<div class="grid-inner" style="height: 50px">'
									 +'<div id="aaa_0'+i+'"><img src="'+j.airImg+'" width="30" height="30" alt=""></div>'
									 +'<div id="aab_0'+i+'">'+j.airportName+' '+j.departureTime+' -> '+j.arrivalTime
									 +'</br>'+' '+j.departAirport+' -> '+j.arrivalAirport+'</div>'
									 +'<div id="aac_0'+i+'">'+j.departDate+' -> '+j.arrivalDate+'</div>'
									 +'</div><div style="height: 30px" ></div>').appendTo('.item1');
					     i++
						 });
						 $.each(d.ar,(i,j)=>{
							 $('<div class="grid-inner">'
									 +'<div id="bba_0'+i+'"><img src="'+j.airImgR+'" width="30" height="30" alt=""></div>'
									 +'<div id="bbb_0'+i+'">'+j.airportNameR+' '+j.departureTimeR+' -> '+j.arrivalTimeR
									 +'</br>'+' '+j.departAirportR+' -> '+j.arrivalAirportR+'</div>'
									 +'<div id="bbc_0'+i+'">'+j.departDateR+' -> '+j.arrivalDateR+' '+'</br>\\'+' '+j.priceR
									 +'<button title="'+' '+j.priceR+'" id="apbtn_0'+i+'" type="button" class="btn btn-danger"> 결제</button></div></div>'
									 +'<div style="height: 30px" ></div>').appendTo('.item2');
						 i++
						 });
						 $('#apbtn_00').click(function(){
							 let data = { 
									 airportName:$('#aab_00').text(),
									 departureTime:$('#aac_00').text(),
									 airportNameR:$('#bbb_00').text(),
									 departureTimeR:$('#bbc_00').text()};
							 $.ajax({
									url: _+'/sw/airsave/'+sessionStorage.getItem('memberId'),
									type:'post',
									data:JSON.stringify(data),
									dataType:'json',
									contentType:'application/json',
									success: d =>{},
									error: e =>{}
									});
							 
							 let a = $(this).attr('title');
							 IMP.init('imp68242076');
								IMP.request_pay({
							    pg : 'inicis', // version 1.1.0부터 지원.
							    pay_method : 'card',
							    merchant_uid : 'merchant_' + new Date().getTime(),
							    name : '주문명:결제테스트',
							    amount : 14000,
							    buyer_email : 'iamport@siot.do',
							    buyer_name : '구매자이름',
							    buyer_tel : '010-1234-5678',
							    buyer_addr : '서울특별시 강남구 삼성동',
							    buyer_postcode : '123-456',
							    m_redirect_url : 'http://localhost:8080/web/reser'
							}, function(rsp) {
							    if ( rsp.success ) {
							        var msg = '결제가 완료되었습니다.';
							        msg += '고유ID : ' + rsp.imp_uid;
							        msg += '상점 거래ID : ' + rsp.merchant_uid;
							        msg += '결제 금액 : ' + rsp.paid_amount;
							        msg += '카드 승인번호 : ' + rsp.apply_num;
							    } else {
							        var msg = '결제에 실패하였습니다.';
							        msg += '에러내용 : ' + rsp.error_msg;
							    }
							});
							}); 
					 });
					} 
				});
			}
		);
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
								dataType:'json',
								contentType : "application/json; charset=UTF-8",
								success:function(res){
									location.assign(_+"/reser");
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
		
		return {init:init,ext:ext};
})();
airport.$= {
		ext: (x)=>{
			$.getScript(x+'/resources/js/router.js',()=>{
				$.extend(new Session(x));
				airport.init();
			})
		}
};
