<?php
namespace Platforme\Bridge\Model\Attribute\Backend;

use Magento\Catalog\Model\Product;
use Magento\Eav\Model\Entity\Attribute\Backend\AbstractBackend;
use Magento\Framework\Exception\LocalizedException;

class Query extends AbstractBackend {
    /**
     * Validate
     * @param Product $object
     * @throws LocalizedException
     * @return bool
     */
    public function validate($object) {
        $value = $object->getData($this->getAttribute()->getAttributeCode());
        return true;
    }
}
