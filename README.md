# RIPE Bridge Magento

## How to install

### Via composer

Run the following commands in Magento 2 root folder:

bash
```
composer config repositories.3rdvision-ripe-bridge-magento git https://github.com/3rdvision/ripe-bridge-magento.git
composer require 3rdvision/ripe-bridge-magento dev-master
php bin/magento setup:upgrade
php bin/magento setup:static-content:deploy
php bin/magento cache:clean
```
