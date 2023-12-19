import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb, Button, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import AdminLayout from "../layouts/AdminLayout";

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    getRestaurants()
  }, [])

  const getRestaurants = async () => {
    const restaurants = await axios.get('http://localhost:8080/api/restaurants')
    setRestaurants(restaurants.data)
    console.log(restaurants.data)
  }
  const deleteRestaurants = (id) => {
    const confirmed = window.confirm('Apakah Anda yakin ingin menghapus?')

    if (confirmed) {
      axios
        .get(`http://localhost:8080/api/restaurants/delete/${id}`)
        .then(() => {
          getRestaurants()
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
          <Breadcrumb.Item active>List Restaurant</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Daftar Restaurant
              </h5>
              <Link to="/restaurant/add">
                <Button variant="success">+ Tambah</Button>
              </Link>
            </div>
            <div className="table-responsive" style={{ overflowY: "auto", maxHeight: "450px" }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nama Restaurant</th>
                    <th>Description</th>
                    <th>Location</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurants.map((resto, index) => (
                    <tr key={resto.id}>
                      <td>{index + 1}</td>
                      <td>{resto.nama_restaurant}</td>
                      <td>{resto.description_restaurant}</td>
                      <td>{resto.location}</td>
                      <td>
                        <Link
                          to={`/restaurant/edit/${resto.id}`}
                          className="btn btn-primary btn-sm mr-2"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteRestaurants(resto.id)}
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

export default Restaurant;
