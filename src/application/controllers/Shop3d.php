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
        $this->load->database();
        $query = $this->db->query("SELECT * FROM tblProduct;");

        $result = array();

        foreach ($query->result() as $row)
        {
            $result[$row->prodId] = new stdClass();
            $result[$row->prodId]->name = $row->prodName;
            $result[$row->prodId]->description = $row->prodDescription;
            $result[$row->prodId]->stock = $row->prodStock;
            $result[$row->prodId]->price = $row->prodPrice;
            $result[$row->prodId]->meshName = $row->prodMeshName;
        }
        echo(json_encode($result));
        $this->output->set_content_type('application/json');
    }
}
