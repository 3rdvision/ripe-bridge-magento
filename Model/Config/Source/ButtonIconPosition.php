<?php

namespace Platforme\Bridge\Model\Config\Source;

use \Magento\Framework\Data\OptionSourceInterface;

class ButtonIconPosition implements OptionSourceInterface {
    public function toOptionArray() {
        return [
            ['label' => 'Left', 'value' => 'left'],
            ['label' => 'Right', 'value' => 'right']
        ];
    }
}
