#!/bin/bash
# Docker installation on Ubuntu 14.04

# Install prerequisites
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates linux-image-extra-$(uname -r) apparmor
sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
sudo echo "deb https://apt.dockerproject.org/repo ubuntu-trusty main" >> /etc/apt/sources.list.d/docker.list

# Install Docker Engine
sudo apt-get update
sudo apt-get install -y docker-engine
sudo service docker start

# Verify installation
sudo docker run hello-world

# Install Docker Compose
sudo curl -L https://github.com/docker/compose/releases/download/1.7.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
sudo docker-compose --version
