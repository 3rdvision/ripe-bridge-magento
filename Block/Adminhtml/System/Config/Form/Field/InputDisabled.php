<?php

namespace Platforme\Bridge\Block\Adminhtml\System\Config\Form\Field;

use Magento\Framework\Data\Form\Element\AbstractElement;
use Magento\Config\Block\System\Config\Form\Field;

class InputDisabled extends Field {
    protected function _getElementHtml(AbstractElement $element) {
        $element->setDisabled('disabled');
        return $element->getElementHtml();
    }
}
