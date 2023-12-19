import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb, Button, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import AdminLayout from "../layouts/AdminLayout";

const Reservation = () => {
  const [reservations, setReservation] = useState([]);

  useEffect(() => {
    getReservation();
  }, []);

  const getReservation = async () => {
    const response = await axios.get(`http://localhost:8080/api/reservation`);
    setReservation(response.data);
  };

  const deleteReservation = (id) => {
    const confirmed = window.confirm("Apakah Anda yakin ingin menghapus?");

    if (confirmed) {
      axios
        .get(`http://localhost:8080/api/reservation/delete/${id}`)
        .then(() => {
          getReservation();
        })
        .catch((error) => {
          console.error("Error deleting reservation:", error);
        });
    }
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>List Reservation</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Daftar Reservation
              </h5>
              <Link to="/reservation/add">
                <Button variant="success">+ Tambah</Button>
              </Link>
            </div>
            <div className="table-responsive" style={{ overflowY: "auto", maxHeight: "450px" }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User/Name</th>
                    <th>Restaurant</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Number Guest</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((res, index) => (
                    <tr key={res.id}>
                      <td>{index + 1}</td>
                      <td>{res.nama ? res.nama : res.in_name}</td>
                      <td>{res.nama_restaurant ? res.nama_restaurant : "-"}</td>
                      <td>{res.date}</td>
                      <td>{res.time}</td>
                      <td>{res.num_guest}</td>
                      <td>
                        <Link
                          to={`/reservation/edit/${res.id}`}
                          className="btn btn-primary btn-sm mr-2"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteReservation(res.id)}
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

export default Reservation;
