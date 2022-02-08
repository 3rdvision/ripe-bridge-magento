<?php

namespace Platforme\Bridge\Observer;
use Magento\Framework\Event\Observer as EventObserver;
use Magento\Framework\Event\ObserverInterface;

class CheckoutCartProductAddAfterObserver implements ObserverInterface {
    /**
     * @var \Magento\Framework\View\LayoutInterface
     */
    protected $_layout;
    /**
     * @var \Magento\Store\Model\StoreManagerInterface
     */
    protected $_storeManager;
    protected $_request;
    /**
     * @param \Magento\Store\Model\StoreManagerInterface $storeManager
     * @param \Magento\Framework\View\LayoutInterface $layout
     */
    public function __construct (
        \Magento\Store\Model\StoreManagerInterface $storeManager,
        \Magento\Framework\View\LayoutInterface $layout,
        \Magento\Framework\App\RequestInterface $request
    ) {
        $this->_layout = $layout;
        $this->_storeManager = $storeManager;
        $this->_request = $request;
    }
    /**
     * Sets item custom price in case it has a custom ripe price option
     *
     * @param EventObserver $observer
     * @return void
     */
    public function execute(EventObserver $observer) {
        $item = $observer->getQuoteItem();
        if ($customPriceOption = $item->getOptionByCode('ripe_price')){
            $customPriceOption = (array) json_decode($customPriceOption->getValue());
            $item->setCustomPrice($customPriceOption["value"]);
            $item->setOriginalCustomPrice($customPriceOption["value"]);
            $item->getProduct()->setIsSuperMode(true);
        }
    }
}
