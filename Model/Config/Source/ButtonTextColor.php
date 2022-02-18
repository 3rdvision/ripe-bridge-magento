<?php

namespace Platforme\Bridge\Model\Config\Source;

use \Magento\Framework\Data\OptionSourceInterface;

class ButtonTextColor implements OptionSourceInterface {
    public function toOptionArray() {
        return [
            ['label' => 'Black', 'value' => '#000000'],
            ['label' => 'White', 'value' => '#ffffff']
        ];
    }
}
