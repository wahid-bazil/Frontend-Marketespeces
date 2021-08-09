import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class Commandes extends Component {
  constructor() {
    super();
    // let redirect = false;
    this.state = {
      favoris: [],
      favorisParEleveur: [],
      eleveurs: [],
      rendred: 0,
      redirect: false,
      // mouton: {},
      // showAvance: false,
      // showReste: false,
    };
    // this.elv = this.elv.bind(this);
    this.handleDeleteFromPanier = this.handleDeleteFromPanier.bind(this);
  }
  // elv = (id) => {
  //   axios
  //     .get("http://127.0.0.1:8000/api/mouton/" + id)
  //     .then((res) => {
  //       //  console.log(res.data.objet)
  //       this.setState({ mouton: res.data.objet });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };


  handleScroll(event) {
    var header = document.getElementById("myHeader");
    var sticky = 280;
    if (header != null) {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    const token = localStorage.getItem("usertoken");
    const mytoken = localStorage.getItem("Mytoken");
    if (!token || !mytoken) {
      this.props.history.push("/login");
    } else {
      axios
        .get("http://127.0.0.1:8000/api/eleveurs", {
          headers: {
            // "x-access-token": token, // the token is a variable which holds the token
          },
        })
        .then((res) => {
          this.setState({
            eleveurs: res.data
          })
        }
      );

      axios
        .get("http://127.0.0.1:8000/api/consommateur/" + token + "/panier", {
          headers: {
            Authorization: 'Bearer '+mytoken,
            // "x-access-token": token, // the token is a variable which holds the token
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          res.data.sort((a, b) => a.id_eleveur > b.id_eleveur ? 1 : -1);
          for (var i = 0; i < res.data.length; i++) {
            res.data[i] = {
              ...res.data[i],
              checked: false
            }
          }
          this.setState(
            {
              favoris: res.data.filter((favoris) => favoris.statut === "disponible")
            }
          );
        }
      );
    }
  }

  handleDeleteFromPanier(Mid) {
    // const idm = this.props.location.state.id;
    // console.log(Mid);
    const token = localStorage.getItem("usertoken");
    const mytoken = localStorage.getItem("Mytoken");
    if (!token || !mytoken) {
      this.props.history.push("/login");
    } else {
      axios
        .put(
          "http://127.0.0.1:8000/api/consommateur/" + token + "/panier/" + Mid,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: 'Bearer '+mytoken
            },
          }
        ).then(() =>{ 
              //delete this.state.favoris.find(mouton => mouton._id === Mid);
             // delete this.state.favoris[0];

            var index = this.state.favoris.findIndex(function(mouton, i){
            return mouton._id === Mid
            });

            this.state.favoris.splice(index,index+1);
            console.log(this.state.favoris);
            this.forceUpdate();

            }
          );
    }
  }

  handleChangeChk(annoncesId) {
    console.log("in handleChangeChk " +  annoncesId);
    let selectedMouton = this.state.favoris.find(annonce => annonce._id === annoncesId);
    selectedMouton.checked = !selectedMouton.checked;
    console.log(selectedMouton);
    this.forceUpdate();
  }

  totalPrice(fav) {
    var totalAvance = 0;
    var totalPrix = 0;
    for (var i = 0; i < fav.length; i++) {
      if (fav[i].checked == true) {
        totalAvance = totalAvance + parseInt(fav[i].avance, 10);
        totalPrix = totalPrix + parseInt(fav[i].prix, 10);
      }
    }
    return [totalAvance, totalPrix];
  }

  /*eleveurName(eleveurId) {
    var eleveur;
    axios
      .get("http://127.0.0.1:8000/api/eleveurs", {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          _id: eleveurId,
        },
      })
      .then((res) => {
        eleveur = res.data,
        console.log(res.data);
      }
    );
    return "dd"; //[totalAvance, totalPrix];
  }*/

  render() {
    this.state.rendred++;
    console.log("render() method "+this.state.rendred);
  
    let titre;
    if (this.state.favoris.length == 1 || this.state.favoris.length == 0) {
      titre = <h6><span>{this.state.favoris.length}</span> Espèce{" "}</h6>;
    } else {
      titre= <h6><span>{this.state.favoris.length}</span> Espèces {" "}</h6>;
    }

    var favParEleveur=[];
    var idEleveur;
    var j=-1;
    for (var i = this.state.favoris.length -1; i >= 0; i--) {
      if (this.state.favoris[i].id_eleveur != idEleveur ) {
        j++;
        idEleveur=this.state.favoris[i].id_eleveur
        favParEleveur.push([])
      }
      favParEleveur[j].push(this.state.favoris[i]);
    }
    this.state.favorisParEleveur=favParEleveur;

    return (
      <div>
        {/* //   {/* <!-- Page Preloder --> */}
        {/* <div id="preloder">
           <div className="loader"></div>
        </div>  */}

        <section className="">
          <div className="container">
            <h4 className="latest-product__item">Mon Panier</h4>
            <div className="row">
              <div className="col-9">
                {/*<!-- Sheeps Grid Section Begin4 --> */}
                <div className="filter__found text-left">
                    <h6>
                      <span>{titre}</span> 
                    </h6>
                  </div>
                <div className="col">
                  {this.state.favorisParEleveur.map((sousFav) => (
                    <div className="mouton__par__eleveur">
                      <div className="nom__eleveur">
                        <div>
                          <ul>
                            {this.state.eleveurs.find(eleveur => eleveur._id === sousFav[0].id_eleveur) == null ? null : 
                              <Link to={{
                                pathname: "/HomeSheepsParEleveur",
                                state: {
                                  id: {
                                    id: sousFav[0].id_eleveur,
                                    nom: this.state.eleveurs.find(eleveur => eleveur._id === sousFav[0].id_eleveur).nom,
                                    prenom: this.state.eleveurs.find(eleveur => eleveur._id === sousFav[0].id_eleveur).prenom,
                                  },
                                },
                              }}>
                                <h5>Eleveur:         {
                                  this.state.eleveurs.find(eleveur => eleveur._id === sousFav[0].id_eleveur).nom
                                  + " " + this.state.eleveurs.find(eleveur => eleveur._id === sousFav[0].id_eleveur).prenom
                                  }
                                </h5>
                              </Link>
                            }
                          </ul>
                        </div>       
                      </div>
                      <hr/>
                      <div className="col-md">
                        {sousFav.map((annonces) => (
                          //  {if(annonces){}}
                          <div className="product__item">
                            <div className="row">
                              <div className="col-1" style = {{marginRight: '-40px'}}>
                                <input type="checkbox"
                                  style={{
                                    height: '20px',
                                    width: '20px',
                                    position: 'relative',
                                    top: '50%',
                                    transform: 'translateY(-50%)'
                                  }}
                                  onChange={(e) => this.handleChangeChk(annonces._id)}
                                />
                              </div>
                              <div className="col-md-6">
                                <div
                                  className="product__item__pic set-bg"
                                  // data-setbg={annonces.images}
                                  // src="Images/sardi1.jpg"
                                >
                                  <centre>
                                    {"  "}
                                    <img
                                      src={annonces.image_face}
                                      className="product__item__pic set-bg"
                                    />
                                  </centre>

                                  <ul className="product__item__pic__hover">
                                    <li>
                                      <Link to={`/DetailsMouton/${annonces._id}`}>
                                        <a href="#">
                                          <i className="fa fa-eye"></i>
                                        </a>
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="col" style = {{marginLeft: '-16px'}}>
                                <table className="table table-sm table-striped" style = {{height: '270px'}}>
                                  <tbody className="product__item__panier__text">
                                    <tr>
                                      <th >Espèce:         </th> <td>{annonces.categorie}</td>
                                    </tr>
                                    <tr>
                                      <th >Race:         </th> <td>{annonces.race}</td>
                                    </tr>
                                    <tr>
                                      <th>Sexe:         </th> <td>{annonces.sexe}</td>
                                    </tr>
                                    <tr>
                                      <th>Age:         </th> <td>{annonces.age + " Mois"}</td>
                                    </tr>
                                    <tr>
                                      <th>Poid:         </th> <td>{annonces.poids + " Kg"}</td>
                                    </tr>
                                    <tr>
                                      <th>Localisation:         </th> <td>{annonces.localisation}</td>
                                    </tr>
                                    <tr>
                                      <th>Avance:         </th> <td>{annonces.avance + " MAD"}</td>
                                    </tr>
                                    <tr>
                                      <th>Prix:         </th> <th>{annonces.prix + " MAD"}</th>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div className="col-1" style = {{marginLeft: '-16px', marginRight: '-20px', height: '249px'}}>
                                <a
                                  style={{
                                    position: 'relative',
                                    top: '50%',
                                    transform: 'translateY(-50%)'
                                  }}
                                  id={annonces._id}
                                  onClick={(e) =>
                                    this.handleDeleteFromPanier(e.currentTarget.id)
                                  }
                                >
                                  <i className="fa fa-minus-square" style = {{color: 'black'}}></i>
                                </a>
                              </div>
                            </div>
                            <hr style = {{marginBottom: '-32px', marginTop: '0px'}}/>
                          </div>
                          
                        ))}
                      </div>
                      <div className="prix__par__eleveur">
                        <h6>{"Avance:         " + this.totalPrice(sousFav)[0] + " MAD"}</h6>
                        <h5>{"Prix:         " + this.totalPrice(sousFav)[1] + " MAD"}</h5>
                        <button type="submit" className="site-btn">
                          Commander
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {/* <!-- Sheeps Grid Section End --> */}
              </div>
              {
                this.state.favorisParEleveur.length == 0 ? null :
                <div className="col-3">
                  <div className="prix__total" id="myHeader">
                    <h6>{"Avance total:         " + this.totalPrice(this.state.favoris)[0] + " MAD"}</h6>
                    <h5>{"Prix total:         " + this.totalPrice(this.state.favoris)[1] + " MAD"}</h5>
                    <button type="submit" className="site-btn">
                      Commander
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default Commandes;
