package com.learning.wikia.rest.config.filters;

import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * CORS filter
 */
public class CORSFilter implements Filter {

    public static final String ACCESS_CONTROL_ALLOW_ORIGIN = "Access-Control-Allow-Origin";
    public static final String ACCESS_CONTROL_ALLOW_METHODS = "Access-Control-Allow-Methods";
    public static final String ACCESS_CONTROL_ALLOW_HEADERS = "Access-Control-Allow-Headers";
    public static final String ACCESS_CONTROL_MAX_AGE = "Access-Control-Max-Age";
    public static final String ACCESS_CONTROL_EXPOSE_HEADERS = "Access-Control-Expose-Headers";

    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        response.setHeader(ACCESS_CONTROL_ALLOW_ORIGIN, "*");
        response.setHeader(ACCESS_CONTROL_ALLOW_METHODS, "POST, GET, PUT, DELETE, PATCH");
        response.setHeader(ACCESS_CONTROL_MAX_AGE, "3600");
        response.setHeader(ACCESS_CONTROL_ALLOW_HEADERS, "Content-Type,X-Requested-With,accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization");
        response.setHeader(ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization, IS-ADMIN");
        chain.doFilter(servletRequest, servletResponse);
    }

    public void init(FilterConfig filterConfig) {
    }

    public void destroy() {
    }
}
