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

    public function getAddress($id)
    {
        $address = $this->db->get_where('tblAddress', array('addrId' => intval($id)))->result();

        echo '<pre>';
        var_dump($address);
        exit('</pre>');

        return array(
            'id' => $address->addrId,
            'street' => $address->addrStreet,
            'city' => $address->addrCity,
            'zip' => $address->addZip
        );
    }

    public function insertAddress($userId, $street, $city, $zip)
    {
        $this->db->insert('tblAddress', array(
            'addrStreet' => $street,
            'addrCity' => $city,
            'addrZip' => $zip
        ));
        $addressId = $this->db->insert_id();
        $this->db->insert('linkCustomerAddress', array(
            'linkCusId' => $userId,
            'linkAddrId' => $addressId
        ));
    }

    public function insertOrder($userId, $addressId, $cart)
    {
        $this->db->insert('tblOrder', array(
            'ordCusId' => $userId,
            'ordAddrId' => $addressId,
            'ordDate' => date('Y-m-d'),
            'ordStatus' => 1
        ));
        $orderId = $this->db->insert_id();
        foreach ($cart as $product)
        {
            $this->db->insert('linkOrderProduct', array(
                'linkOrdId' => $orderId,
                'linkProdId' => $product['id'],
                'linkQuantity' => $product['quantity'],
                'linkProductPrice' => $product['price']
            ));
        }
    }
}
