<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

namespace Platforme\Bridge\Model\Attribute\Frontend;

use Magento\Eav\Model\Entity\Attribute\Frontend\AbstractFrontend;
use Magento\Framework\DataObject;

class Query extends AbstractFrontend
{
    public function getValue(DataObject $object)
    {
        $value = $object->getData($this->getAttribute()->getAttributeCode());
        return "<b>$value</b>";
    }
}
