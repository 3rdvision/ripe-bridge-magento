<?php

namespace Platforme\Bridge\Observer;
use Magento\Framework\Event\Observer as EventObserver;
use Magento\Framework\Event\ObserverInterface;

class CheckoutCartProductAddAfterObserver implements ObserverInterface
{
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
    public function __construct(
        \Magento\Store\Model\StoreManagerInterface $storeManager,
        \Magento\Framework\View\LayoutInterface $layout,
        \Magento\Framework\App\RequestInterface $request
    ) {
        $this->_layout = $layout;
        $this->_storeManager = $storeManager;
        $this->_request = $request;
    }
    /**
     * Add order information into GA block to render on checkout success pages
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

        /* To Do */
        // Edit Cart - May need to remove option and readd them
        // Pre-fill remarks on product edit pages
        // Check for comparability with custom option
    }
}
