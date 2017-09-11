package com.learning.wikia.core.logging;

public final class LogManager {

    public static final ILogger getLogger(Class<?> clazz) {
        return new Slf4jLogger(clazz);
    }

}
