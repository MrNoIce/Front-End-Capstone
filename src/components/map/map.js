import React, { Component } from "react";
import ImageUploader from "react-images-upload";

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture)
    });
  }

  render() {
    return (
      <ImageUploader
        withIcon={true}
        buttonText="Choose images"
        onChange={this.onDrop}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      />
    );
  }
}

export default Image;

// import React, { Component } from "react";
// // import ReactMapGL, { NavigationControl, GeolocateControl } from "react-map-gl";
// // import IssueForm from "../issues/newIssueForm"
// // import "mapbox-gl/dist/mapbox-gl.css";

// // const API_KEY = process.env.REACT_APP_API_KEY;

// // const navStyle = {
// //   position: "absolute",
// //   top: 50,
// //   left: 0,
// //   padding: "10px"
// // };

// class Map extends Component {

// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       viewport: {
// //         longitude: -86.7816016,
// //         latitude: 36.1626638,
// //         zoom: 15,
// //         bearing: 0,
// //         pitch: 0,
// //         width: 1000,
// //         height: 700
// //         // longitude: position.coords.longitude,
// //         // latitude: position.coords.latitude
// //       }
// //     };
//     // this.handler = this.handler.bind(this);
// //   this.state = {
// //     lngLat: lngLat
// // };
//   }

// // handler() {
// //     this.setState({
// //         lngLat: lngLat
// //     });
// // }

//   render() {
//     // const { viewport } = this.state;
//     return (
//     //   <ReactMapGL
//     //     {...viewport}
//     //     mapStyle="mapbox://styles/mapbox/streets-v9"
//     //     containerStyle={{
//     //       height: "100vh",
//     //       width: "100vw"
//     //     }}
//     //     mapboxApiAccessToken={API_KEY}
//     //     onViewportChange={viewport => this.setState({ viewport })}
//     //     onClick={ () => this.props.onClickMap()}
//     //   >
//     //     <div style={{ position: "absolute", right: 0 }} />>
//     //     <div className="nav" style={navStyle}>
//     //     {/* <IssueForm lngLat={this.state} /> */}
//     //       <NavigationControl />
//     //       <GeolocateControl />
//     //     </div>
//     //   </ReactMapGL>
//     );
//   }
// }

// export default Map;
