<?php

namespace Platforme\Bridge\Model\Config\Source;

use \Magento\Framework\Data\OptionSourceInterface;

class ButtonOrientation implements OptionSourceInterface {
    public function toOptionArray() {
        return [
            ['label' => 'Horizontal', 'value' => 'horizontal'],
            ['label' => 'Vertical', 'value' => 'vertical']
        ];
    }
}
