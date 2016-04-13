<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Customer extends CI_Controller {

    public function login()
    {
        if (isset($_POST['EMAIL']) and isset($_POST['PASSWORD']))
        {
            $email = $_POST['EMAIL'];
            $password = $_POST['PASSWORD'];

            $this->load->model('Customers_model');

            if ($this->Customers_model->getPasswordFromCustomer($email) == $password)
            {
                echo(json_encode(array('success' => 'true')));
                $this->output->set_content_type('application/json');
                return;
            }
        }
        echo(json_encode(array('success' => 'false')));
        $this->output->set_content_type('application/json');
    }

    public function create()
    {
        if (isset($_POST['FIRST_NAME']) and isset($_POST['LAST_NAME']) and isset($_POST['GENDER'])
            and isset($_POST['EMAIL']) and isset($_POST['PHONE']) and isset($_POST['PASSWORD'])
            and isset($_POST['STREET']) and isset($_POST['CITY']) and isset($_POST['ZIP']))
        {
            $this->load->model('Customers_model');

            if (($idCustomer = $this->Customers_model->insertCustomer($_POST['FIRST_NAME'], $_POST['LAST_NAME'],
                $_POST['GENDER'], $_POST['EMAIL'], $_POST['PHONE'], $_POST['PASSWORD'])) !== false)
            {
                $this->Customers_model->insertAddress($idCustomer, $_POST['STREET'], $_POST['CITY'], $_POST['ZIP']);
                echo(json_encode(array('success' => 'true')));
                $this->output->set_content_type('application/json');
                return;
            }
        }
        echo(json_encode(array('success' => 'false')));
        $this->output->set_content_type('application/json');
    }
}
