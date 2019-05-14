package com.yeogil.web.domain;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data @Component
public class HotelDTO {
	private String hotelName,
					price,
					roomType,
					notice,
					imgUrl;
}
