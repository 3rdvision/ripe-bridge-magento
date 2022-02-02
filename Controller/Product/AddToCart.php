<?php

namespace Platforme\Bridge\Controller\Product;

class AddToCart extends \Magento\Framework\App\Action\Action
{

    protected $cart;
    protected $productRepository;

    public function __construct(
        \Magento\Framework\App\Action\Context $context,
        \Magento\Framework\View\Result\PageFactory $resultPageFactory,
        \Magento\Catalog\Model\ProductRepository $productRepository,
        \Magento\Checkout\Model\Cart $cart,
        \Psr\Log\LoggerInterface $logger
    ) {
        $this->resultPageFactory = $resultPageFactory;
        $this->cart = $cart;
        $this->productRepository = $productRepository;
        $this->logger = $logger;
        parent::__construct($context);
    }
    public function execute() {
        try {
            $productParams = $this->getRequest()->getParams();

            $visibleOptions = array();
            $customOptions = array(array(
                "label" => "image",
                "value" => "https://placekitten.com/500/500"
            ));

            $productDetailsParams = array_diff_key($productParams, array_flip(["id"]));
            foreach ($productDetailsParams as $key => $value) {
                $visibleOptions[] = array(
                    "label" => $key,
                    "value" => $value
                );
            }
            $productDetails = array();
            $productDetails["qty"] = "1";

            $product = $this->productRepository->getById($productParams["id"]);

            if ($visibleOptions) {
                $product->addCustomOption("additional_options", json_encode($visibleOptions));
                $product->addCustomOption("other_options", json_encode($customOptions));
            }

            $this->cart->addProduct($product, $productDetails);
            $this->cart->save();

            $this->messageManager->addSuccessMessage(__("Successfully added product to cart."));
        } catch (\Magento\Framework\Exception\LocalizedException $e) {
            $this->messageManager->addExceptionMessage(
                $e,
                __("%1", $e->getMessage())
            );
        } catch (\Exception $e) {
            $this->messageManager->addExceptionMessage($e, __("error."));
        }
        $this->getResponse()->setRedirect("/checkout/cart/index");
    }
}
