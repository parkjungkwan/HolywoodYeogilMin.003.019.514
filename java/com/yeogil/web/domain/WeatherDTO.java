package com.yeogil.web.domain;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data @Component
public class WeatherDTO {
	private String day , htem, ltem, imgUrl;
}
