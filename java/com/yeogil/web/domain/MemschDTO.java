package com.yeogil.web.domain;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data @Component
public class MemschDTO {
	private String msSeq,msCountryName,msTitle,msCount,countryCode,countryName;
}
