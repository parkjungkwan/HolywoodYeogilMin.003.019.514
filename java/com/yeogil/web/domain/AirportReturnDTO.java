package com.yeogil.web.domain;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data @Component
public class AirportReturnDTO {
	private String 	airportNameR,//리턴항공사이름				
					departureTimeR,//리턴출발시간	
					arrivalTimeR,//리턴도착시간
					departAirportR,//리턴출발공항
					arrivalAirportR,//리턴도착공항
					departDateR,//리턴출발날짜
					arrivalDateR,//리턴도착날짜
					priceR,//항공예약가격 리턴가격과 같음
					airImgR//리턴항공로고
					;
					
}
