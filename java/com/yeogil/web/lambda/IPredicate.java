package com.yeogil.web.lambda;

@FunctionalInterface
public interface IPredicate {
	public abstract boolean test(Object o);
}
