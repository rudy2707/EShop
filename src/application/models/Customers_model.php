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

    function insertCustomer($firstName, $lastName, $gender, $email, $phone, $password)
    {
        $data = array(
            'cusFirstName' => $firstName,
            'cusLastName' => $lastName,
            'cusGender' => $gender,
            'cusEmail' => $email,
            'cusPhone' => $phone,
            'cusPassword' => $password
        );

        // Save state of debug, desactivate them and restore them
        $debugState = $this->db->db_debug;
        $this->db->db_debug = false;
        // Return true if insert is successful
        $ret = $this->db->insert('tblCustomer', $data);
        $this->db->db_debug = $debugState;
        if (!$ret)
        {
            return false;
        }
        else
        {
            return true;
        }
    }
}
