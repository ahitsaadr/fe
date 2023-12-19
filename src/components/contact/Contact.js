import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb, Button, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import AdminLayout from "../layouts/AdminLayout";

const Contact = () => {
  const [contacts, setContact] = useState([])

  useEffect(() => {
    getContact()
  }, [])

  const getContact = async () => {
    const contact = await axios.get('http://localhost:8080/api/contact')
    setContact(contact.data)
    console.log(contact.data)
  }
  const deleteContact = (id) => {
    const confirmed = window.confirm('Apakah Anda yakin ingin menghapus?')

    if (confirmed) {
      axios
        .get(`http://localhost:8080/api/contact/delete/${id}`)
        .then(() => {
          getContact()
        })
        .catch((error) => {
          console.error('Error deleting restaurant:', error)
        })
    }
  }

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>List Message</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Daftar Message
              </h5>
              <Link to="/contact/add">
                <Button variant="success">+ Tambah</Button>
              </Link>
            </div>
            <div className="table-responsive" style={{ overflowY: "auto", maxHeight: "450px" }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact, index) => (
                    <tr key={contact.id}>
                      <td>{index + 1}</td>
                      <td>{contact.nama}</td>
                      <td>{contact.email}</td>
                      <td>{contact.message}</td>
                      <td>
                        <Link
                          to={`/contact/edit/${contact.id}`}
                          className="btn btn-primary btn-sm mr-2"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteContact(contact.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Contact;
