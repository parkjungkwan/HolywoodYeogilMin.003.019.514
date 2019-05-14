<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>여길가자 yeogil</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDAbI_gl7rYkLoODMNEkmDZDvaKkAuigkY&callback=initMap"></script>
<script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>

<!-- datepicker cdn -->
<link rel="stylesheet" href="http://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
<script src="http://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

<!-- <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css"> -->

<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="${css}/common/web/default_ko.css" type="text/css" />
<link rel="stylesheet" href="${css}/component/reset.css" />
<link rel="stylesheet" href="${css}/component/default.css" />
<link rel="stylesheet" href="${css}/web/plan_v2.css" />
<%-- <link rel="stylesheet" href="${css}/web/date_picker.css" /> --%>
<link rel="stylesheet" href="${css}/mypage/plan/plan_sub.css" />
<link rel="stylesheet" href="${css}/mypage/plan/plan.css" />
<link rel="stylesheet" href="${css}/mypage/top.css" />
<link rel="stylesheet" href="${css}/common/web/gnb.css" />
<link rel="stylesheet" href="${css}/city/header_v2.css" />
<link rel="stylesheet" href="${css}/area/area.css" />
<script src="${js}/plan/placeholder.js"></script>
<script src="${js}/plan/markerwithlabel.js"></script>

</head>

<body>
	<div id="wrapper">
		<!-- 메인 네비 -->
		<div id="header">
			<div class="wrap">
				<h1 id="home" class="logo fl" style="margin-top: 0px; margin-bottom: 0px; font-size: 0px;">
					<img alt="" src="${img}/common/logo1.png" style="width: 150px;">
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

		<div id="map" class="fl"></div>


		<!-- footer -->
		<div id="footer">
			<div class="wrap">
				<div class="footer_col fl">
					<div class="footer_title">어스토리</div>
					<a href="/ko/area">여행지</a> <a href="/ko/plan">일정만들기</a>
					<!--//<a href="/ko/hotel">호텔</a>-->
					<a href="https://www.agoda.com/?cid=1607809" target="_blank">호텔</a>
					<a href="/ko/community/qa">Q&amp;A</a> <a href="/ko/community/tips">여행TIP</a>
					<a href="/ko/mobile">모바일</a>
					<!--모바일-->
				</div>

				<div class="footer_col fl">
					<div class="footer_title">회사이야기</div>
					<a href="/ko/helpdesk/about">회사소개</a> <a href="/ko/helpdesk/intro">이용방법</a>
					<a href="/ko/helpdesk/contact">광고 및 제휴</a>
				</div>

				<div class="footer_col fl">
					<div class="footer_title">고객센터</div>
					<a href="/ko/helpdesk/faq">FAQ</a> <a href="/ko/helpdesk">문의하기</a>
					<a href="/ko/helpdesk/policy">이용약관</a> <a
						href="/ko/helpdesk/personal_info">개인정보 처리방침</a>
				</div>
				<div class="footer_col fl" style="margin-right: 0px;">
					<div class="footer_title"
						style="border-bottom: 0px; margin-bottom: 0px;">&nbsp;</div>

					<div class="fl footer_lang_box" id="footer_lang_sel_box"
						data-is_open="0" data-h="ko/ko">한국어</div>
					<div id="lang_chage_item_box">
						<a href="/ko/" class="prevent_href lang_change_item" data="ko">한국어</a>
						<a href="/ja/" class="prevent_href lang_change_item" data="ja">日本語</a>
						<a href="/" class="prevent_href lang_change_item" data="en">English</a>
					</div>
					<div class="fl footer_currency_box" id="footer_currency_sel_box"
						data-is_open="0">KRW</div>
					<div id="currency_change_item_box">
						<a class="currency_change_item" data="KRW">KRW</a> <a
							class="currency_change_item" data="JPY">JPY</a> <a
							class="currency_change_item" data="USD">USD</a>
					</div>
					<div class="clear" style="padding-bottom: 20px"></div>
					<div class="clear"></div>
				</div>

				<div class="clear"></div>
			</div>
		</div>
	</div>
</body>

<script	src="${js}/comp/compo.js"></script>
<script	src="${js}/plan/sche.js"></script>
<script	src="${js}/plan/plan.js"></script>
<script src="${js}/yeogil.js"></script>
<script	src="${js}/plan/mypage.js"></script>
<script	src="${js}/plan/mysche.js"></script>
<%-- <script src="${js}/router.js"></script> --%>
<script>
	plan.cont("${ctx}");
</script>
</html>
