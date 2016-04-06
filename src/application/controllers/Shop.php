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
}
