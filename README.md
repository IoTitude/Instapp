# Instapp

Mobile application for installing new metering units. App has been developed with Ionic framework and backend uses BaasBox. More detailed information can be found in the [wiki](https://github.com/IoTitude/Instapp/wiki).

## Tools

[Ionic](http://ionicframework.com/) 1.7.14
[BaasBox](http://www.baasbox.com/) 0.9.5

## Release Plan

### Release Plan for 0.1

| Status | Step | Status |
|:----|:----|:----|
| Accepted/ Denied | User can log in | Done |
| Accepted/ Denied | User can log out | Done |

### Release Plan for 0.2

| Status | Step | Status |
|:----|:----|:----|
| Accepted/ Denied | User can get a list of open tasks | Done |
| Accepted/ Denied | User can enable a device from open tasks | Done |
| Accepted/ Denied | User can disable a device from open tasks | Done |

### Release Plan for 0.3

| Status | Step | Status |
|:----|:----|:----|
| Accepted/ Denied | Instapp uses an external configuration file | - |
| Accepted/ Denied | Add proper error handling for when Instapp can't reach the BaasBox server | - |

### Misc Features

- Security considerations
  - tokens expire
  - token refresh
  - user groups and users
- Save tokens to device
- Implement more detailed data to metering units
- Installer needs to input installation information on activation
- Proper error handling
- BaasBox communicates with SDN controller
- BaasBox communicates with KAAadmin and KaMU
- User can read the QR of a metering unit in order to find the related open task
- Look and feel to match common design principles
