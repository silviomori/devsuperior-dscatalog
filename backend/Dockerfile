# docker build -t dscatalog:0.0.1 .
# docker run -p 80:8080 --name dscatalog-heroku -e APP_PROFILE=dev -e DB_URL=jdbc:postgresql://ec2-54-211-160-34.compute-1.amazonaws.com:5432/deknla4fnmie0m -e DB_USERNAME=rnkhpzvefpyxpf -e DB_PASSWORD=87c4c34bdb03a13ebe50eeaa4f9de9f0d3623484800e37f9fd56f007916c455d dscatalog:0.0.1
FROM openjdk:11
VOLUME /tmp
EXPOSE 8080
ADD ./target/dscatalog-0.0.1-SNAPSHOT.jar dscatalog-0.0.1.jar
ENTRYPOINT ["java","-jar","/dscatalog-0.0.1.jar"]
