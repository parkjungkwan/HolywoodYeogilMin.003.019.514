package com.yeogil.web.domain;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data @Component
public class MemschCityDTO {
	private String msDay,msCityName,msDate;
	private int ms_ctiy_seq,ms_seq;
}
