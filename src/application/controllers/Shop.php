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
        $this->load->model('Products_model');

        echo(json_encode($this->Products_model->getProductsList()));
        $this->output->set_content_type('application/json');
    }
}
