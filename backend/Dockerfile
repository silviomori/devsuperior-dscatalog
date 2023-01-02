# docker build -t silviomori/technomori-dscatalog:0.0.1 .
# docker push silviomori/technomori-dscatalog:0.0.1
FROM openjdk:11
VOLUME [ "/tmp" ]
EXPOSE 8080
ADD ./target/dscatalog-0.0.1-SNAPSHOT.jar dscatalog-0.0.1.jar
ENTRYPOINT ["java","-jar","/dscatalog-0.0.1.jar"]
