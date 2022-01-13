# RIPE Bridge Magento

## Installation

### Using composer

Run the following commands in Magento 2 root folder:


```bash
composer config repositories.3rdvision-ripe-bridge-magento git git@github.com:3rdvision/ripe-bridge-magento.git
composer require 3rdvision/ripe-bridge-magento
bin/magento module:enable Platforme_Bridge
bin/magento setup:upgrade
bin/magento setup:di:compile
bin/magento setup:static-content:deploy
bin/magento cache:clean
```
