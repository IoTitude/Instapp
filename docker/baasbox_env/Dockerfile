FROM java:8
MAINTAINER Ruben Laube-Pohto

RUN mkdir -p /usr/src/
WORKDIR /usr/src/
RUN wget --content-disposition http://www.baasbox.com/download/baasbox-stable.zip
# Version number could change at any time. Don't know how to get specific version.
RUN unzip baasbox*.zip
RUN rm baasbox*.zip
RUN mv baasbox-*/ baasbox/
WORKDIR baasbox/
RUN chmod +x ./start

EXPOSE 9000

CMD ["./start"]

# Docker 'run' command
# docker run -di -p 9000:9000 --name=baasbox baasbox
