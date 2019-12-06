import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow
} from "@material-ui/core";
import Axios from "axios";
import { APIURL } from "../suport/apiUrl";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Fade from "react-reveal/Fade";

class ManageAdmin extends Component {
  state = {
    datafilm: [],
    readmore: -1,
    modaladd: false
  };

  componentDidMount() {
    Axios.get(`${APIURL}movies`)
      .then(res => {
        this.setState({ datafilm: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onSaveAddDataClick = () => {
    var jadwaltemplate = [12, 14, 16, 18, 20];
    var jadwal = [];
    for (var i = 0; i < jadwaltemplate.length; i++) {
      if (this.refs[`jadwal${i}`].checked) {
        jadwal.push(jadwaltemplate[i]);
      }
    }
    var iniref = this.refs;
    var title = iniref.title.value;
    var image = iniref.image.value;
    var sinopsis = iniref.sinopsis.value;
    var sutradara = iniref.sutradara.value;
    var genre = iniref.genre.value;
    var durasi = iniref.durasi.value;
    var produksi = iniref.produksi.value;
    var jadwal = iniref.jadwal.value;
    var data = {
      title: title,
      image,
      sinopsis,
      sutradara,
      genre,
      durasi,
      produksi,
      jadwal
    };
    Axios.get(`${APIURL}movies`, data)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.data);
      });
  };

  renderMovies = () => {
    return this.state.datafilm.map((val, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{val.title}</TableCell>
          <TableCell>
            <img src={val.image} alt={"gambar"} height="200px" />
          </TableCell>
          {this.state.readmore === index ? (
            <TableCell>
              {val.sinopsis}
              <span
                style={{ color: "red" }}
                onClick={() => this.setState({ readmore: -1 })}
              >
                {" "}
                Read Less
              </span>
            </TableCell>
          ) : (
            <TableCell>
              {val.sinopsis.split("").filter((val, index) => index <= 100)}
              <span
                style={{ color: "red" }}
                onClick={() => this.setState({ readmore: index })}
              >
                {" "}
                Read More
              </span>
            </TableCell>
          )}
          <TableCell>{val.jadwal}</TableCell>
          <TableCell>{val.sutradara}</TableCell>
          <TableCell>{val.genre}</TableCell>
          <TableCell>{val.durasi}</TableCell>
          <TableCell>
            <button className="btn btn-outline-primary">Edit</button>
          </TableCell>
          <TableCell>
            <button className="btn btn-outline-danger">Delete</button>
          </TableCell>
        </TableRow>
      );
    });
  };

  render() {
    return (
      <div className="mx-3">
        <Modal isOpen={this.state.modaladd}>
          <ModalHeader>ADD DATA</ModalHeader>
          <ModalBody>
            <input
              type="text"
              ref="title"
              placeholder="title"
              className="form-control"
            />
            <input
              type="text"
              ref="image"
              placeholder="image"
              className="form-control"
            />
            <input
              type="text"
              ref="sinopsis"
              placeholder="sinopsis"
              className="form-control"
            />
            Jadwal:
            <input type="checkbox" ref="jadwal0" />
            12.00
            <input type="checkbox" ref="jadwal1" />
            14.00
            <input type="checkbox" ref="jadwal2" />
            16.00
            <input type="checkbox" ref="jadwal3" />
            18.00
            <input type="checkbox" ref="jadwal4" />
            20.00
            <input
              type="text"
              ref="sutradara"
              placeholder="sutradara"
              className="form-control"
            />
            <input
              type="number"
              ref="durasi"
              placeholder="durasi"
              className="form-control"
            />
            <input
              type="text"
              ref="genre"
              placeholder="genre"
              className="form-control"
            />
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-info">Save</button>
            <button
              onClick={() => this.setState({ modaladd: false })}
              className="btn btn-warning"
            >
              Cancel
            </button>
          </ModalFooter>
        </Modal>
        <Fade>
          <center className="mt-3">
            <button
              className="btn btn-success"
              onClick={() => this.setState({ modaladd: true })}
            >
              add data
            </button>
          </center>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Judul</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Synopsis</TableCell>
                <TableCell>Jadwal</TableCell>
                <TableCell>Sutradara</TableCell>
                <TableCell>Genre</TableCell>
                <TableCell>Durasi</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{this.renderMovies()}</TableBody>
          </Table>
        </Fade>
      </div>
    );
  }
}

export default ManageAdmin;
