<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Shop extends CI_Controller {

	public function index()
	{
        $this->load->helper('url');
        $this->load->view('header');
        $this->load->view('shop');
        $this->load->view('footer');
	}

    public function productList()
    {
        if (isset($_POST['FILTER']))
        {
            $filter = $_POST['FILTER'];
            $this->load->model('Products_model');

            echo(json_encode($this->Products_model->getProductsList($filter)));
            $this->output->set_content_type('application/json');
            return;
        }
        echo(json_encode(array('success' => 'false')));
        $this->output->set_content_type('application/json');
    }

	public function makeOrder()
	{
		$cart = json_decode(isset($_POST['cart']) ? $_POST['cart'] : "-");

		if ($cart === null)
		{
			$this->output->set_status_header(400);
			return;
		}

		$userId = $_POST['userId'];
		$addressId = $_POST['addressId'];

		$this->load->model('Customers_model');
		$this->Customers_model->insertOrder($userId, $addressId, $cart);

		$this->load->model('Products_model');
		foreach ($cart as $product)
		{
			$this->Products_model->decrementQuantity($product['id'], $product['quantity']);
		}
	}
}
