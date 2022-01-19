# RIPE Bridge for Magento 2

## Installation

### Using Composer

Run the following commands in Magento installation root folder:

```bash
composer config repositories.3rdvision-ripe-bridge-magento git git@github.com:3rdvision/ripe-bridge-magento.git
composer require 3rdvision/ripe-bridge-magento
bin/magento module:enable Platforme_Bridge
bin/magento setup:upgrade
bin/magento setup:di:compile
```

## License

[Apache License 2.0](LICENSE.txt)
