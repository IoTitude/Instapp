# Instapp

Instapp is a mobile application for installing new metering units. App has been developed with Ionic framework and backend uses BaasBox. More detailed information can be found in the [wiki](https://github.com/IoTitude/Instapp/wiki).

<!-- MDTOC maxdepth:6 firsth1:2 numbering:1 flatten:1 bullets:0 updateOnSave:1 -->

1. [Tools](#tools)   
2. [Setup](#setup)   
3. [Release Plan](#release-plan)   

<!-- /MDTOC -->

## Tools

- [Ionic](http://ionicframework.com/) 1.7.14
- [BaasBox](http://www.baasbox.com/) 0.9.5

## Setup

- Install Ionic Framework
- Run `setup.sh`
- Configute BaasBox server in `baasbox.config.js`
- Run `gulp minjs` in order to generate new `app.bundle.min.js`
- To build the app:
  - Connect anroid phone to the computer.
  - Enable USB debugging in the developer options.
  - Run `ionic run android` to build and start the app on the phone.

## Release Plan

[See the wiki](https://github.com/IoTitude/Instapp/wiki/Release-Plan)
