import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb, Button, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import AdminLayout from "../layouts/AdminLayout";

const Menu = () => {
  const [menus, setMenu] = useState([]);

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    const response = await axios.get(`http://localhost:8080/api/menu`);
    setMenu(response.data);
  };

  const deleteMenu = (id) => {
    const confirmed = window.confirm("Apakah Anda yakin ingin menghapus?");

    if (confirmed) {
      axios
        .get(`http://localhost:8080/api/menu/delete/${id}`)
        .then(() => {
          getMenu();
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
          <Breadcrumb.Item active>List Menu</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Daftar Menu
              </h5>
              <Link to="/menu/add">
                <Button variant="success">+ Tambah</Button>
              </Link>
            </div>
            <div className="table-responsive" style={{ overflowY: "auto", maxHeight: "450px" }}>
              <Table striped bordered hover width={"100%"}>
                <thead>
                  <tr>
                    <th width={"5%"}>#</th>
                    <th width={"10%"}>Image</th>
                    <th width={"13%"}>Food Name</th>
                    <th width={"30%"}>Description</th>
                    <th width={"13%"}>Price</th>
                    <th width={"14%"}>Restaurant</th>
                    <th width={"15%"}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {menus.map((menu, index) => (
                    <tr key={menu.id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={`http://localhost:8080/images/menu/${menu.image}`}
                          alt="Menu Image"
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      </td>
                      <td>{menu.nama}</td>
                      <td>{menu.description}</td>
                      <td>{menu.price}</td>
                      <td>
                        {menu.nama_restaurant ? menu.nama_restaurant : "-"}
                      </td>
                      <td>
                        <Link
                          to={`/menu/edit/${menu.id}`}
                          className="btn btn-primary btn-sm mr-2"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteMenu(menu.id)}
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

export default Menu;
