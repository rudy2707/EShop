<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Customers_model extends CI_Model
{
    function __construct()
    {
        $this->load->database();
    }

    function getPasswordFromCustomer($email)
    {
        $this->db->select('cusPassword');
        $this->db->from('tblCustomer');
        $this->db->where('cusEmail', $email);
        $query = $this->db->get();

        // Get only one row (we shouln't have more than one password)
        $row = $query->row();
        if (isset($row))
        {
            return $row->cusPassword;
        }
    }
}
