# Instapp

Mobile application for installing new metering units. App has been developed with Ionic framework and backend uses BaasBox. More detailed information can be found in the wiki.

## Tools

Ionic 1.7.14
BaasBox 0.9.5

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
| Accepted/ Denied | User can read the QR of a metering unit in order to find the related open task | - |
| Accepted/ Denied | Kaa integration | - |
| Accepted/ Denied | Application uses tokens that expire | - |
| Accepted/ Denied | Automatically get fresh tokens if logged in | - |

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
