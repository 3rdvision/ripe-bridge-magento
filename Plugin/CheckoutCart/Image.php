<?php

namespace Platforme\Bridge\Plugin\CheckoutCart;

class Image {
    public function afterGetImage($item, $result)
    {
        //  if(CONDITION) {
        //     $result->setImageUrl(IMAGE_URL);
        //  }
        $imageUrl = json_decode($item->getItem()->getOptionByCode("other_options")->getValue())[0]->value;
        // dump($imageUrl);
        $result->setImageUrl($imageUrl);
        return $result;
    }
}
