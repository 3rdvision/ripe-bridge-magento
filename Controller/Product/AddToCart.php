<?php
namespace Platforme\Bridge\Controller\Product;
 
class AddToCart extends \Magento\Framework\App\Action\Action {

    protected $cart;
    protected $productRepository;

    public function __construct(
        \Magento\Framework\App\Action\Context $context,
        \Magento\Framework\View\Result\PageFactory $resultPageFactory,
        \Magento\Catalog\Model\ProductRepository $productRepository,
        \Magento\Checkout\Model\Cart $cart
    ) {
        $this->resultPageFactory = $resultPageFactory;
        $this->cart = $cart;
        $this->productRepository = $productRepository;
        parent::__construct($context);
    }
    public function execute()
    {
        try {
            // get product details from params
            $productId = $this->getRequest()->getParam('id');
            $productParams = $this->getRequest()->getParams();
            $additionalOptions = [];
            $additionalOptions[] = array(
                'label' => "Custom options", //Custom option label
                'value' => "testyyyyyy", //Custom option value
            );
            $productDetails = array();
            $productDetails['qty'] = '1';
            $product = $this->productRepository->getById($productId);

            if ($additionalOptions) {
                $product->addCustomOption('additional_options', json_encode($additionalOptions));
            }

            $this->cart->addProduct($product, $productDetails);
            $this->cart->save();

            $this->messageManager->addSuccessMessage(__('Successfully added product to cart.'));
        } catch (\Magento\Framework\Exception\LocalizedException $e) {
            $this->messageManager->addExceptionMessage(
                $e,
                __('%1', $e->getMessage())
            );
        } catch (\Exception $e) {
            $this->messageManager->addExceptionMessage($e, __('error.'));
        }
        $this->getResponse()->setRedirect('/checkout/cart/index');
    }
}
