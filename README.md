# Instapp

Instapp is a mobile application for installing new metering units. App has been developed with Ionic framework and backend uses BaasBox. More detailed information can be found in the [wiki](https://github.com/IoTitude/Instapp/wiki).

<!-- MDTOC maxdepth:6 firsth1:2 numbering:1 flatten:1 bullets:0 updateOnSave:1 -->

1. [Tools](#tools)   
2. [Setup](#setup)   
3. [Release Plan](#release-plan)   
3.1. [Release Plan for v0.1](#release-plan-for-v01)   
3.2. [Release Plan for v0.2](#release-plan-for-v02)   
3.3. [Release Plan for v0.3](#release-plan-for-v03)   
3.4. [Release Plan for v0.4](#release-plan-for-v04)   
3.5. [Misc Features](#misc-features)   

<!-- /MDTOC -->

## Tools

- [Ionic](http://ionicframework.com/) 1.7.14
- [BaasBox](http://www.baasbox.com/) 0.9.5

## Setup

- Run `npm install` to install all required packages.
- Run `ionic resources` to generate icons and splash screens for the platforms specified for the project. Only android is set for this project.
- To build the app:
  - Connect anroid phone to the computer.
  - Enable USB debugging in the developer options.
  - Run `ionic run android` to build and start the app on the phone.

## Release Plan

### Release Plan for v0.1

| Status | Step | Status |
|:----|:----|:----|
| Accepted/ Denied | User can log in | Done |
| Accepted/ Denied | User can log out | Done |

### Release Plan for v0.2

| Status | Step | Status |
|:----|:----|:----|
| Accepted/ Denied | User can get a list of open tasks | Done |
| Accepted/ Denied | User can enable a device from open tasks | Done |
| Accepted/ Denied | User can disable a device from open tasks | Done |

### Release Plan for v0.3

| Status | Step | Status |
|:----|:----|:----|
| Accepted/ Denied | Instapp uses an external configuration file | Moved to next version. Code needs to be refactored. |
| Accepted/ Denied | Add proper error handling for when Instapp can't reach the BaasBox server | Done |

### Release Plan for v0.4

| Status | Step | Status |
|:----|:----|:----|
| Accepted/ Denied | Refactor code into proper modules | Done |
| Accepted/ Denied | Connect Instapp and BaasBox with the other sevices | - |

### Misc Features

- BaasBox communicates with SDN controller
- BaasBox communicates with KAAadmin and KaMU
- Security considerations
  - tokens expire
  - token refresh
  - user groups and users
- Implement more detailed data to metering units
- Installer needs to input installation information on activation
- User can read the QR of a metering unit in order to find the related open task
- Look and feel to match common design principles
