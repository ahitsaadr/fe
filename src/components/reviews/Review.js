import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb, Button, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import AdminLayout from "../layouts/AdminLayout";

const Review = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    const response = await axios.get(`http://localhost:8080/api/reviews`);
    setReviews(response.data);
  };

  const deleteReviews = (id) => {
    const confirmed = window.confirm("Apakah Anda yakin ingin menghapus?");

    if (confirmed) {
      axios
        .get(`http://localhost:8080/api/reviews/delete/${id}`)
        .then(() => {
          getReviews();
        })
        .catch((error) => {
          console.error("Error deleting reviews:", error);
        });
    }
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>List Reviews</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Daftar Reviews
              </h5>
              <Link to="/review/add">
                <Button variant="success">+ Tambah</Button>
              </Link>
            </div>
            <div className="table-responsive" style={{ overflowY: "auto", maxHeight: "450px" }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Restaurant</th>
                    <th>Comment</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review, index) => (
                    <tr key={review.id}>
                      <td>{index + 1}</td>
                      <td>{review.nama ? review.nama : "-"}</td>
                      <td>
                        {review.nama_restaurant ? review.nama_restaurant : "-"}
                      </td>
                      <td>{review.comment}</td>
                      <td>
                        <Link
                          to={`/review/edit/${review.id}`}
                          className="btn btn-primary btn-sm mr-2"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteReviews(review.id)}
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

export default Review;
