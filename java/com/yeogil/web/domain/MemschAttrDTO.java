package com.yeogil.web.domain;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data @Component
public class MemschAttrDTO {
	private String msAttrName;
	private int ms_attr_seq,ms_ctiy_seq;
}
