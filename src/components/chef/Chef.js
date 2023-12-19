import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb, Button, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import AdminLayout from "../layouts/AdminLayout";

const Chef = () => {
  const [chefs, setChef] = useState([]);

  useEffect(() => {
    getChef();
  }, []);

  const getChef = async () => {
    const response = await axios.get(`http://localhost:8080/api/chef`);
    setChef(response.data);
  };

  const deleteChef = (id) => {
    const confirmed = window.confirm("Apakah Anda yakin ingin menghapus?");

    if (confirmed) {
      axios
        .get(`http://localhost:8080/api/chef/delete/${id}`)
        .then(() => {
          getChef();
        })
        .catch((error) => {
          console.error("Error deleting menu:", error);
        });
    }
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>List Chef</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Daftar Chef
              </h5>
              <Link to="/chef/add">
                <Button variant="success">+ Tambah</Button>
              </Link>
            </div>
            <div className="table-responsive" style={{ overflowY: "auto", maxHeight: "450px" }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {chefs.map((chef, index) => (
                    <tr key={chef.id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={`http://localhost:8080/images/chef/${chef.image}`}
                          alt="Chef Image"
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      </td>
                      <td>{chef.nama}</td>
                      <td>
                        <Link
                          to={`/chef/edit/${chef.id}`}
                          className="btn btn-primary btn-sm mr-2"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteChef(chef.id)}
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

export default Chef;
