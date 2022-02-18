<?php

namespace Platforme\Bridge\Model\Config\Source;

use \Magento\Framework\Data\OptionSourceInterface;

class OrderImportTopic implements OptionSourceInterface {
    public function toOptionArray() {
        return [
            ['label' => 'Pending', 'value' => 'pending'],
            ['label' => 'Closed', 'value' => 'closed'],
            ['label' => 'Processing', 'value' => 'processing']
        ];
    }
}
