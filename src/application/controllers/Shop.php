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
        $data = json_decode(file_get_contents('php://input'), true);

        if ($data === null)
        {
            echo(json_encode(array('success' => 'false')));
            $this->output->set_content_type('application/json');

            $this->output->set_status_header(400);
            return;
        }

        $this->load->model('Customers_model');

        $userId = $this->Customers_model->getCusIdFromCustomer($data['email']);
        $addressId = $this->Customers_model->getAddrIdFromCustomer($data['email']);

        $this->Customers_model->insertOrder($userId, $addressId, $data['cart']);

        $this->load->model('Products_model');
        foreach ($data['cart'] as $product)
        {
            $this->Products_model->decrementQuantity($product['id'], $product['quantity']);
        }
        echo(json_encode(array('success' => 'true')));
        $this->output->set_content_type('application/json');
        return;
	}
}
