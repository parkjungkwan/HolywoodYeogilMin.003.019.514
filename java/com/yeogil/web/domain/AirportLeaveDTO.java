package com.yeogil.web.domain;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data @Component
public class AirportLeaveDTO {
	private String airportName,	//항공사이름				
					departureTime,//출발시간	
					arrivalTime,//도착시간
					departAirport,//출발공항
					arrivalAirport,//도착공항
					departDate,//출발날짜
					arrivalDate,//도착날짜
					airImg//항공사로고
					;
					
}
