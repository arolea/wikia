package com.learning.wikia.persistence.config;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.elasticsearch.client.Client;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.node.NodeBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.EntityMapper;
import org.springframework.data.elasticsearch.core.geo.CustomGeoModule;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

import java.io.IOException;
import java.net.InetAddress;

/**
 * Elasticsearch persistence configuration.
 */
@Configuration
@EnableElasticsearchRepositories(basePackages = "com.learning.wikia.persistence.repositories")
@PropertySource(value = "classpath:elasticsearch.properties")
public class PersistenceConfig {

    @Value("${elasticsearch.host}")
    private String host;

    @Value("${elasticsearch.port}")
    private int port;

    @Value("${elasticsearch.clustername}")
    private String clusterName;

    @Bean
    @Profile(value="dev")
    public Client client() throws Exception {
        Settings esSettings = Settings.settingsBuilder()
                .put("cluster.name", clusterName)
                .build();
        return TransportClient.builder()
                .settings(esSettings)
                .build()
                .addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName(host), port));
    }

    @Bean(name = "elasticsearchTemplate")
    @Profile(value="dev")
    public ElasticsearchOperations elasticsearchTemplate() throws Exception {
        return new ElasticsearchTemplate(client(), new CustomEntityMapper());
    }

    @Bean(name = "elasticsearchTemplate")
    @Profile(value="test")
    public ElasticsearchOperations testTemplate() {
        Settings settings = Settings.settingsBuilder()
                .put("path.home","target/elastic")
                .build();
        return new ElasticsearchTemplate(new NodeBuilder().settings(settings).local(true).node().client(), new CustomEntityMapper());
    }

    public static class CustomEntityMapper implements EntityMapper {

        private final ObjectMapper objectMapper;

        public CustomEntityMapper() {
            objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            objectMapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
            objectMapper.registerModule(new CustomGeoModule());
            objectMapper.registerModule(new JavaTimeModule());
        }

        @Override
        public String mapToString(Object object) throws IOException {
            return objectMapper.writeValueAsString(object);
        }

        @Override
        public <T> T mapToObject(String source, Class<T> clazz) throws IOException {
            return objectMapper.readValue(source, clazz);
        }
    }

}
