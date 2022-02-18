<?php

namespace Platforme\Bridge\Model\Config\Source;

use \Magento\Framework\Data\OptionSourceInterface;

class ButtonPrimaryText implements OptionSourceInterface {
    public function toOptionArray() {
        return [
            ['label' => 'test1', 'value' => 'test1'],
            ['label' => 'test2', 'value' => 'test2']
        ];
    }
}
