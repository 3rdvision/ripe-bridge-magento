<?php

namespace Platforme\Bridge\Plugin\CheckoutCart;

class Image {
    public function afterGetImage($item, $result) {
        if($ripeImageOption= $item->getItem()->getOptionByCode("ripe_image")) {
            $imageUrl = json_decode($ripeImageOption->getValue())->value;
            $result->setImageUrl($imageUrl);
        }
        return $result;
    }
}
