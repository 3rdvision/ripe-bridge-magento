<?php

namespace Platforme\Bridge\Model\Config\Source;

use \Magento\Framework\Data\OptionSourceInterface;

class OrderImportState implements OptionSourceInterface {
    public function toOptionArray() {
        return [
            ['label' => 'Created', 'value' => 'created'],
            ['label' => 'Pending', 'value' => 'pending']
        ];
    }
}
