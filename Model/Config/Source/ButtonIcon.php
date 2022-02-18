<?php

namespace Platforme\Bridge\Model\Config\Source;

use \Magento\Framework\Data\OptionSourceInterface;

class ButtonIcon implements OptionSourceInterface {
    public function toOptionArray() {
        return [
            ['label' => 'Icon 1', 'value' => 'icon_1'],
            ['label' => 'Icon 2', 'value' => 'icon_2'],
            ['label' => 'Icon 3', 'value' => 'icon_3'],
            ['label' => 'Icon 4', 'value' => 'icon_4']
        ];
    }
}
