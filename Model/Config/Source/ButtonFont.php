<?php

namespace Platforme\Bridge\Model\Config\Source;

use \Magento\Framework\Data\OptionSourceInterface;

class ButtonFont implements OptionSourceInterface {
    public function toOptionArray() {
        return [
            ['label' => 'Default', 'value' => ''],
            ['label' => 'Abel', 'value' => 'abel_n4'],
            ['label' => 'Akko', 'value' => 'akko_n4'],
            ['label' => 'Helvetica', 'value' => 'helvetica_n4'],
            ['label' => 'Poppins', 'value' => 'poppins_n4'],
            ['label' => 'Neue Plak', 'value' => 'neue_plak_n4'],
            ['label' => 'Zurich', 'value' => 'zurich_n4'],
            ['label' => 'Other', 'value' => '_other']
        ];
    }
}
