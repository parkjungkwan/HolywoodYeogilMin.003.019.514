package com.yeogil.web.domain;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data @Component
public class MemberDTO {
	private String memberId, nickname, thumbnailImg;
}
