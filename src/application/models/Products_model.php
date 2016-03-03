<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Products_model extends CI_Model
{
    function __construct()
    {
        $this->load->database();
    }

    function getProductsList()
    {
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

        return $result;
    }
}
