<?php

namespace Platforme\Bridge\Observer;

use Magento\Framework\Event\Observer as EventObserver;
use Magento\Framework\Event\ObserverInterface;

class SalesModelServiceQuoteSubmitBeforeObserver implements ObserverInterface {
    private $quoteItems = [];
    private $quote = null;
    private $order = null;
    private $logger = null;

    public function __construct(\Psr\Log\LoggerInterface $logger) {
        $this->logger = $logger;
    }

    /**
     * Add order information into GA block to render on checkout success pages
     *
     * @param EventObserver $observer
     * @return void
     */
    public function execute(EventObserver $observer) {
        $this->quote = $observer->getQuote();
        $this->order = $observer->getOrder();
        /* @var  \Magento\Sales\Model\Order\Item $orderItem */
        foreach($this->order->getItems() as $orderItem) {
            if(!$orderItem->getParentItemId() && $orderItem->getProductType() == \Magento\Catalog\Model\Product\Type::TYPE_SIMPLE) {
                if($quoteItem = $this->getQuoteItemById($orderItem->getQuoteItemId())) {
                    if ($additionalOptionsQuote = $quoteItem->getOptionByCode('additional_options')) {
                        if ($additionalOptionsOrder = $orderItem->getProductOptionByCode('additional_options')) {
                            $additionalOptions = array_merge($additionalOptionsQuote, $additionalOptionsOrder);
                        }
                        else {
                            $additionalOptions = $additionalOptionsQuote;
                        }
                        $options = $orderItem->getProductOptions();
                        $options['additional_options'] = json_decode($additionalOptions->getValue());
                        $orderItem->setProductOptions($options);
                    }
                }
            }
        }
    }


    /**
     * Add order information into GA block to render on checkout success pages
     *
     * @param string $id
     * @return null
     */
    private function getQuoteItemById($id) {
        if(empty($this->quoteItems)) {
            foreach($this->quote->getItems() as $item) {
                if(!$item->getParentItemId() && $item->getProductType() == \Magento\Catalog\Model\Product\Type::TYPE_SIMPLE) {
                    $this->quoteItems[$item->getId()] = $item;
                }
            }
        }
        if(array_key_exists($id, $this->quoteItems)) {
            return $this->quoteItems[$id];
        }
        return null;
    }
}
