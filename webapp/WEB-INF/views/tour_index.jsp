<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>여길가자 yeogil</title>
  
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width"/>
  <script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>
  
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	
	<link class="cj_css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
	<link class="cj_css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<link class="cj_css" rel="stylesheet" href="${css}/area/area.css"/>
	<link class="cj_css" rel="stylesheet" href="${css}/area/area_main.css"/>
	<link class="cj_css" rel="stylesheet" href="${css}/area/city_list.css">
	<link class="cj_css" rel="stylesheet" href="${css}/city/header_v2.css" />
	<link class="cj_css" rel="stylesheet" href="${css}/city/main.css" />
	<link class="cj_css" rel="stylesheet" href="${css}/city/spot_list.css" />
	<link class="cj_css" rel="stylesheet" href="${css}/common/web/default_ko.css" />
	<link class="cj_css" rel="stylesheet" href="${css}/common/web/gnb.css" />
	<link class="cj_css" rel="stylesheet" href="${css}/component/default.css" />
	<link class="cj_css" rel="stylesheet" href="${css}/component/reset.css" />
	<link class="cj_css" rel="stylesheet" href="${css}/web/main.css" />
	<link class="cj_css" rel="stylesheet" href="${css}/web/date_picker.css" /> 
	
  	
</head>
<body>
<div id="wrapper">
<!-- 메인 네비 -->
		<div id="header">
			<div class="wrap">
				<h1 id="home" class="logo fl" style="margin-top: 0px; margin-bottom: 0px; font-size: 0px;">
					<img alt="여행의 시작! 어스토리" src="${img}/common/logo1.png" style="width: 150px;">
				</h1>
				<ul class="gnb fl">
					<a href="#" class="fl"><li id="tour">여행지</li></a>
					<a href="#" class="fl"><li id="plan">일정만들기</li></a>
					<a href="#" class="fl"><li id="reservation">항공·호텔</li></a>
					<a href="#" class="fl"><li id="admin" >관리자</li></a>
				</ul>
					<div class="fr gnb_box" style="padding-top: 10px;">
					<a id="custom-login-btn" href="javascript:loginWithKakao()">
						<img src="https://developers.kakao.com/assets/img/about/logos/kakaologin/kr/kakao_login_btn_small.png" style="width: 100px;"/>

					</a>
					
				</div>
				
				<div class="clear"></div>
			</div>
		</div>
		<div class="clear"></div>
<!-- 컨탠츠 -->
		<div id="common_area"></div>

<!-- footer -->
<div id="footer">
	<div class="wrap">
		<div class="footer_col fl">
			<div class="footer_title">어스토리</div>
			<a href="/ko/area">여행지</a>
			<a href="/ko/plan">일정만들기</a>
			<!--//<a href="/ko/hotel">호텔</a>-->
			<a href="https://www.agoda.com/?cid=1607809" target="_blank">호텔</a>
						<a href="/ko/community/qa">Q&amp;A</a>
			<a href="/ko/community/tips">여행TIP</a>
						<a href="/ko/mobile">모바일</a><!--모바일-->
		</div>

		<div class="footer_col fl">
			<div class="footer_title">회사이야기</div>
			<a href="/ko/helpdesk/about">회사소개</a>
			<a href="/ko/helpdesk/intro">이용방법</a>
			<a href="/ko/helpdesk/contact">광고 및 제휴</a>
		</div>

		<div class="footer_col fl">
			<div class="footer_title">고객센터</div>
			<a href="/ko/helpdesk/faq">FAQ</a>
			<a href="/ko/helpdesk">문의하기</a>
			<a href="/ko/helpdesk/policy">이용약관</a>
			<a href="/ko/helpdesk/personal_info">개인정보 처리방침</a>
		</div>
				<div class="footer_col fl" style="margin-right:0px;">
			<div class="footer_title" style="border-bottom:0px;margin-bottom:0px;">&nbsp;</div>
		
			<div class="fl footer_lang_box" id="footer_lang_sel_box" data-is_open="0" data-h="ko/ko">
									한국어
							</div>
			<div id="lang_chage_item_box">
				<a href="/ko/" class="prevent_href lang_change_item" data="ko">한국어</a>
				<a href="/ja/" class="prevent_href lang_change_item" data="ja">日本語</a>
				<a href="/" class="prevent_href lang_change_item" data="en">English</a>
			</div>
			<div class="fl footer_currency_box" id="footer_currency_sel_box" data-is_open="0">				
				KRW			</div>
			<div id="currency_change_item_box">
				<a class="currency_change_item" data="KRW">KRW</a>
				<a class="currency_change_item" data="JPY">JPY</a>
				<a class="currency_change_item" data="USD">USD</a>
			</div>
			<div class="clear" style="padding-bottom:20px"></div>
			<div class="clear"></div>
		</div>
		
		<div class="clear"></div>
	</div>

</div>
</div>

</body>
<script src="${js}/comp/compo.js"></script>
<script src="${js}/yeogil.js"></script>
<script src="${js}/main/main.js"></script>
<script src="${js}/tour/tour.js"></script>
<script src="${js}/city/city.js"></script>
<script src="${js}/plan/sche.js"></script>
<script src="${js}/plan/plan.js"></script>
<script src="${js}/plan/mypage.js"></script>
<script src="${js}/plan/mysche.js"></script>
<script src="${js}/reservation/airport.js"></script>
<script src="${js}/reservation/hotel.js"></script>
<script id="cj_dotdotdot" class="cj_css" src="${js}/city/dotdotdot.js"></script>
<script>
	tour.cont("${ctx}");
</script>
</html>
