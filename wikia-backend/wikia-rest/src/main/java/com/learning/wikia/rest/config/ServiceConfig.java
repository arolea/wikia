package com.learning.wikia.rest.config;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.learning.wikia.persistence.config.PersistenceConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Primary;
import org.springframework.data.elasticsearch.core.geo.CustomGeoModule;
import org.springframework.hateoas.MediaTypes;
import org.springframework.hateoas.config.EnableEntityLinks;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebMvc
@EnableEntityLinks
@Import(value={PersistenceConfig.class})
public class ServiceConfig extends WebMvcConfigurerAdapter {

    private static final String SPRING_HATEOAS_OBJECT_MAPPER = "_halObjectMapper";

    @Autowired
    @Qualifier(SPRING_HATEOAS_OBJECT_MAPPER)
    private ObjectMapper springHateoasObjectMapper;

    @Autowired
    private Jackson2ObjectMapperBuilder springBootObjectMapperBuilder;

    @Bean(name = "objectMapper")
    @Primary
    public ObjectMapper objectMapper() {
        springHateoasObjectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
        springHateoasObjectMapper.setSerializationInclusion(JsonInclude.Include.NON_EMPTY);
        springHateoasObjectMapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
        springHateoasObjectMapper.configure(DeserializationFeature.READ_DATE_TIMESTAMPS_AS_NANOSECONDS, false);
        springHateoasObjectMapper.configure(SerializationFeature.WRITE_DATE_TIMESTAMPS_AS_NANOSECONDS, false);
        springHateoasObjectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        springHateoasObjectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        springHateoasObjectMapper.registerModule(new CustomGeoModule());
        springHateoasObjectMapper.registerModule(new JavaTimeModule());
        this.springBootObjectMapperBuilder.configure(this.springHateoasObjectMapper);
        return springHateoasObjectMapper;
    }

    @Bean
    public MappingJackson2HttpMessageConverter jacksonMessageConverter() {
        MappingJackson2HttpMessageConverter messageConverter = new MappingJackson2HttpMessageConverter();
        messageConverter.setSupportedMediaTypes(Arrays.asList(MediaTypes.HAL_JSON, MediaType.APPLICATION_JSON));
        messageConverter.setObjectMapper(objectMapper());
        return messageConverter;
    }

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(jacksonMessageConverter());
        converters.add(new StringHttpMessageConverter());
        super.configureMessageConverters(converters);
    }

}
