FROM frolvlad/alpine-oraclejdk8:slim
VOLUME /tmp
ADD wikia-rest-1.0-SNAPSHOT.jar wikia-rest.jar
RUN sh -c 'touch /wikia-rest.jar'
ENV JAVA_OPTS=""
ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /wikia-rest.jar" ]