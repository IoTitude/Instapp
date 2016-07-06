These plugins extended the functionality of the basic BaasBox installation. The plugins were available on the `/plugin/instapp.enabled` and `/plugin/instapp.toggle` endpoints.

`instapp.enabled` was used by the SDN controller to check if a metering unit was enabled for reading or not. The contoller checked for this information on a timeout of 30 seconds.

`instapp.toggle` provided the means of setting the `enabled` status.
