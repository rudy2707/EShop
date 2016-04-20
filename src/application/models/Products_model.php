<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Products_model extends CI_Model
{
    public function __construct()
    {
        $this->load->database();
    }

    public function getProductsList($filter='')
    {
        $query = $this->db->query("SELECT * FROM tblProduct
                                            INNER JOIN tblCategory
                                            ON prodCategory = catId
                                            WHERE prodName LIKE '%{$filter}%';");
        $result = array();

        foreach ($query->result() as $row)
        {
            $result[$row->prodId] = new stdClass();
            $result[$row->prodId]->id = $row->prodId;
            $result[$row->prodId]->name = $row->prodName;
            $result[$row->prodId]->description = $row->prodDescription;
            $result[$row->prodId]->category = $row->catLabel;
            $result[$row->prodId]->stock = $row->prodStock;
            $result[$row->prodId]->price = $row->prodPrice;
            $result[$row->prodId]->meshName = $row->prodMeshName;
        }

        return $result;
    }

    public function decrementQuantity($id, $n)
    {
        $this->db->set('prodStock', 'prodStock-'.intval($n), false);
        $this->db->where('prodId', $id);
        $this->db->update('tblProduct');
    }
}
