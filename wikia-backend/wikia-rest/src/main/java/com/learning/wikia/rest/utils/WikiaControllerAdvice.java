package com.learning.wikia.rest.utils;

import com.learning.wikia.core.logging.ILogger;
import com.learning.wikia.core.logging.LogManager;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Centralized error handling
 */
@ControllerAdvice
public class WikiaControllerAdvice {

    private static final ILogger LOG = LogManager.getLogger(WikiaControllerAdvice.class);

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public String handleAppException(Exception exception) {
        LOG.error(exception);
        return "An application error has occurred : " + exception.getMessage();
    }

}
