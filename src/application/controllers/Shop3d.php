<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Shop3d extends CI_Controller {

	public function index()
	{
        $this->load->helper('url');
        $this->load->view('header');
        $this->load->view('shop3D');
        $this->load->view('footer');
	}

    public function productList()
    {
        $this->load->model('Products_model');

        echo(json_encode($this->Products_model->getProductsList()));
        $this->output->set_content_type('application/json');
    }

    public function checkPassword()
    {
        if (isset($_POST['USER']) and isset($_POST['PWD']))
        {
            $email = $_POST['USER'];
            $password = $_POST['PWD'];

            $this->load->model('Customers_model');

            if ($this->Customers_model->getPasswordFromCustomer($email) == $password)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        return false;
    }
}
