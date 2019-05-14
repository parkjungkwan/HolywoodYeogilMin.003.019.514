var hotel = hotel || {};
hotel =(()=>{
		let _, js, css, img, compojs;
		
		let init=()=>{
			_ = $.ctx();
			js = $.js();
			css = $.css();
			img = $.img();
			compojs = js+'/comp/compo.js';
			onCreate();
		};
		let onCreate=()=>{
			setContentView();
		};
		let setContentView=()=>{
			$('.ej_css').remove();
			$('.cj_css').remove();
			$('.jw_css').remove();
			let sw_css = 
				  '<meta charset="utf-8">'
				  +'<meta http-equiv="X-UA-Compatible" content="IE=edge">'
				  +'<meta name="viewport" content="width=device-width, initial-scale=1">'
				  +'<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet">'
				  +'<link class="sw_css" rel="stylesheet" href="'+css+'/common/hbootstrap.min.css" />'
				  +'<link class="sw_css" rel="stylesheet" href="'+css+'/common/hstyle.css" />'
	//어스토리	
				  +'<link class="sw_css" rel="stylesheet" href="'+css+'/common/web/default_ko.css" />'
				  +'<link class="sw_css" rel="stylesheet" href="'+css+'/common/web/gnb.css" />'
				  +'<link class="sw_css" rel="stylesheet" href="'+css+'/component/default.css" />'
				  +'<link class="sw_css" rel="stylesheet" href="'+css+'/component/reset.css" />'
				  +'<link class="sw_css" rel="stylesheet" href="'+css+'/web/main.css" />'
				  +'<link class="sw_css" rel="stylesheet" href="'+css+'/web/date_picker.css" /> ';
				$(sw_css).appendTo('head');
				
				$.getScript(compojs, ()=>{
					$('#common_area').empty();
					$('#common_area').css("background-image", "url('"+_+"/resources/img/hbackground.jpg')");
					$(compo.hreservation()).appendTo('#common_area');
					$('#hdes_01').text("여행지");
					$('#hchc_01').text("체크인");
					$('#hchc_02').text("체크아웃");
					$('#hroom_01').text("룸");
					$('#hadul_01').text("성인");
					$('#hchil_01').text("유/아동");
					$('#hcheck_01').text("검색");
					$('#htext_01').text("원하는 호텔을 예약하세요");
					$('#htext_02').text("여길가자와 함께 전 세계 모든 호텔들을 둘러보세요");
					$('<button id="hml_01" class="btn btn-primary">호텔</button>').prependTo('#hmbtn_01');
					$('<button id="hml_02" class="btn btn-primary">항공</button>').prependTo('#hmbtn_01');
					$('#hml_02').click(()=>{
						airport.init();
					});
					$('#hml_01').click(()=>{
						setContentView();
					});
//========================================호텔검색눌렀을때
					$('#hcheck_01').click(function(e){
						e.preventDefault();
						let data = {arrivalDate:$('#h_date_01').val(),
								departDateR:$('#h_date_02').val()};//map자체
						if(data.arrivalDate===""||data.departDateR===""){
							alert("모든 항목을 기입해주세요");
						}else{
//==========================================호텔 크롤링
							$.ajax({
								url: _+'/crawling/hvation',
								type:'post',
								data:JSON.stringify(data),
								dataType:'json',
								contentType:'application/json',
								success: d =>{
									$(compo.hresult()).appendTo('#common_area');
									$.each(d.htlist,(i,j)=>{
										if(i<9){
											$('<div class="intro_box" style="height:320px"><img src="'+j.imgUrl
													+'" width="348" height="170" alt=""></img>'
													+'<div id="hicon'+i+'" class="intro_title">'+j.hotelName+'</div>'
													+'<div class="btn-area">'
													+'<div class="btn-wrap position-relative">'
													+'<button id="hotel_p0'+i+'" type="button" class="btn btn-primary">예약 및 결제진행</button><p id="hnoti_0'+i+'">'+j.notice+'<p id="hprice_0'+i+'">'+j.price+'<p id="rtype_0'+i+'">'+j.roomType+''
													+'</div>'
													+'</div>'
													+'<div class="clear"></div></div>').attr('name',j.imgname).appendTo('.intro_list').click(function(){
													});
										}
										i++;
									 });
									$('#hotel_p00').click(function(){
										 ghxpf();
									 });
								},
								error:e=>{}
							});
						}
					});
				});
		};
		let ghxpf=()=>{
			let data = {hotelName:$('#hicon0').html(),
						price:$('#hprice_00').html(),
						roomType:$('#rtype_00').html(),
						notice:$('#hnoti_00').html()};
//=====================================호텔 정보저장
				$.ajax({
					url: _+'/sw/htsave/'+sessionStorage.getItem('memberId'),
					type:'post',
					data:JSON.stringify(data),
					dataType:'json',
					contentType:'application/json',
					success: d =>{},
					error: e =>{}
					});
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
		};
		return {init:init};
})();