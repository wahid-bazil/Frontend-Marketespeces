import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";

import { Link } from "react-router-dom";
class Commander extends Component {
  constructor() {
    super();
    // let redirect = false;
    this.state = {
      // point_relais: "",
      Commande: {},
      Espece: {},
      eleveur: {},
      Modepaiement:false,

      checked: false,
      Empty: true,
      image: "",
      selectedOptionVille: null,
      selectedOptionPaiment:null,
      optionpaiment:[
        { value:"payer juste l'avance",label:"payer juste l'avance"},
        { value:"payer le montant total",label:"payer le montant total"}
        
      ],
      optionsVille: [
        { value: "Berkane", label: "Berkane" },
        { value: "Driouch", label: "Driouch" },
        { value: "Figuig", label: "Figuig" },
        { value: "Guercif", label: "Guercif" },
        { value: "Jerada", label: "Jerada" },
        { value: "Nador", label: "Nador" },
        { value: "Oujda-Angad", label: "Oujda-Angad" },
        { value: "Taourirt", label: "Taourirt" },
        { value: "Ahfir", label: "Ahfir" },
        { value: "Saida", label: "Saidia" },
        { value: "Tafoughalt", label: "Tafoughalt" },
      ],

      redirect: false,
    };
    // this.onChange = this.onChange.bind(this);
    this.onChangecheck = this.onChangecheck.bind(this);
    this.onClickImageBoucle = this.onClickImageBoucle.bind(this);
    this.onClickImageProfile = this.onClickImageProfile.bind(this);
    this.onClickImageFace = this.onClickImageFace.bind(this);
  }

  handleChangeVille = (selectedOptionVille) => {
    this.setState({ selectedOptionVille }, () =>
      // const token = localStorage.getItem("usertoken");
      // if
      // console.log("tuseroken"+ token)
      // let cmd = {
      //   // localisation: e.target.value,
      //   point_relais: e.target.value,
      //   id_Espece: this.props.location.state.id,
      //   id_eleveur: this.state.eleveur._id,
      //   id_consommateur: localStorage.getItem("usertoken");,
      //   statut: "en attente de paiement avance",
      //   reçu_avance: "",
      //   feedback_avance: "",
      //   msg_refus_avance: null,
      //   reçu_montant_restant: null,
      //   feedback_reçu_montant_restant: null,
      //   msg_refus_reste: null,
      //   date_creation: new Date(),
      //   // .toLocaleString()
      // }
      this.setState({
        Commande: {
          // localisation: e.target.value,
          point_relais: this.state.selectedOptionVille.value,
          id_Espece: this.props.location.state.id,
          id_eleveur: this.state.eleveur._id,
          id_consommateur: localStorage.getItem("usertoken"),
          statut: "en attente de paiement avance",
          reçu_avance: "",
          feedback_avance: "",
          msg_refus_avance: null,
          reçu_montant_restant: null,
          feedback_reçu_montant_restant: null,
          msg_refus_reste: null,
          date_creation: new Date(),
          // .toLocaleString()
        },
        Empty: false,
      })
    );
  };
  handleChangeModepaiement = (selectedOptionPaiment) => {
    if(selectedOptionPaiment.value=="payer juste l'avance"){
    this.setState({ selectedOptionPaiment }, () =>
      this.setState({
        Modepaiement:true,
      })
        
           
  
  
      
    )
}
   else{
  this.setState({ selectedOptionPaiment }, () =>
  this.setState({
    Modepaiement:false
},


  )
)

}
    
}


      



 
  // onChange(e) {

  //   const token = localStorage.getItem("usertoken");
  //   // if
  //   // console.log("tuseroken"+ token)
  //   let cmd = {
  //     // localisation: e.target.value,
  //     point_relais: e.target.value,
  //     id_Espece: this.props.location.state.id,
  //     id_eleveur: this.state.eleveur._id,
  //     id_consommateur: token,
  //     statut: "en attente de paiement avance",
  //     reçu_avance: "",
  //     feedback_avance: "",
  //     msg_refus_avance: null,
  //     reçu_montant_restant: null,
  //     feedback_reçu_montant_restant: null,
  //     msg_refus_reste: null,
  //     date_creation: new Date(),
  //     // .toLocaleString()
  //   };
  //   this.setState({
  //     Commande: cmd,
  //     Empty:false
  //   });
  // }
  onChangecheck(e) {
    if (this.state.checked == true) this.setState({ checked: false });
    else this.setState({ checked: true });
  }

  componentDidMount() {
    const idm = this.props.location.state.id;
    const token = localStorage.getItem("usertoken");
    if (!token) {
      this.props.history.push("/login");
    } else{
    axios
      .get("http://127.0.0.1:8000/api/Espece/" + idm, {
        headers: {
          // "x-access-token": token, // the token is a variable which holds the token
        },
      })
      .then((res) => {
        this.setState({
          Espece: res.data.objet,
          eleveur: res.data.Eleveur[0],
          image: res.data.objet.image_profile,
        });
        console.log(res);
      });

    console.log(this.state.Espece);}
  }

  onClickImageBoucle() {
    this.setState({ image: this.state.Espece.image_boucle });
  }
  onClickImageProfile() {
    this.setState({ image: this.state.Espece.image_profile });
  }
  onClickImageFace() {
    this.setState({ image: this.state.Espece.image_face });
  }

  render() {
    if (this.state.selectedOptionPaiment=="payer just l'avance"){
      this.state.Modepaiement=true;
    }


    const { selectedOptionVille } = this.state;
    const{selectedOptionPaiment}=this.state;
    const { optionsVille } = this.state;
    const{optionpaiment}=this.state;
    return (
      <div>
        <br></br>
        <section class="sectionn">
          <div className="sectionn1">
          <div class="container">
            <div className="row">
              <div class="col-lg-6 col-md-6">
                <div class="product__details__pic">
                  <div class="product__details__pic__item">
                    <img
                      class="product__details__pic__item--large"
                      src={this.state.image}
                      alt=""
                    />
                  </div>
                  {/* <div className="product__details__pic__slider owl-carousel">
                    <img
                      data-imgbigurl="Images/1.jpg"
                      src="Images/1.jpg"
                      alt=""
                    />
                    <img
                      data-imgbigurl="Images/1.jpg"
                      src="Images/1.jpg"
                      alt=""
                    />
                  </div> */}

                  <div className="row">
                    <div className="container">
                      <div className="col-lg-12 col-md-12">
                        <img
                          className="col-lg-4 col-md-4"
                          // data-imgbigurl="Images/1.jpg"
                          src={this.state.Espece.image_boucle}
                          alt=""
                          onClick={this.onClickImageBoucle}
                        />
                        <img
                          className="col-lg-4 col-md-4"
                          // data-imgbigurl="Images/1.jpg"
                          src={this.state.Espece.image_face}
                          alt=""
                          onClick={this.onClickImageFace}
                        />
                        <img
                          className="col-lg-4 col-md-4"
                          // data-imgbigurl="Images/1.jpg"
                          src={this.state.Espece.image_profile}
                          alt=""
                          onClick={this.onClickImageProfile}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div class="checkout__form">
                  <form action="#" onSubmit="" name="commander">
                    <h3>Commander votre Espece</h3> <br></br>
                    <h4>Résumé de vote commande</h4>
                    <div class="col-lg-12 col-md-6">
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="checkout__input">
                            <p>
                              <b>Boucle</b>
                            </p>
                            <span>{this.state.Espece.boucle}</span>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="checkout__input">
                            <p>
                              <b>Race</b>
                            </p>
                            <span>{this.state.Espece.race}</span>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-lg-6">
                          <div class="checkout__input">
                            <p>
                              <b>Poids</b>
                            </p>
                            <span>{this.state.Espece.poids} Kg</span>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="checkout__input">
                            <p>
                              <b>Age</b>
                            </p>
                            <span>{this.state.Espece.age} mois</span>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-lg-6">
                          <div class="checkout__input">
                            <p>
                              <b>Avance</b>
                            </p>
                            <span>{this.state.Espece.avance} MAD</span>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="checkout__input">
                            <p>
                              <b>Prix Espece</b>
                            </p>
                            <span>{this.state.Espece.prix} MAD</span>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-lg-6">
                          <div class="checkout__input">
                            <p>
                              <b>Eleveur</b>
                            </p>
                            <span>
                              {this.state.eleveur.nom +
                                "   " +
                                this.state.eleveur.prenom}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h4>Détails livraison</h4>
                    <div class="col-lg-12 col-md-6">
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="checkout__input">
                            <b>
                              Votre ville de livraison<span>*</span>
                            </b>
                            <div className="col-lg-9 col-md-9">
                              <Select
                                value={selectedOptionVille}
                                onChange={this.handleChangeVille}
                                options={optionsVille}
                                placeholder="Ville"

                                // className="Select"
                              />
                              <br></br>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="checkout__input">
                            <p>
                              <b>Le point de relais</b>
                            </p>
                            <span>Rue 233 Hassan II Oujda</span>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-lg-6">
                          <div class="checkout__input">
                            <p>
                              <b>Date de livraison</b>
                            </p>
                            <span>La veille de l'Aid</span>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="checkout__input bg-ligh text-danger h6 center">
                            <p>
                              <b>Heure de livraison</b>
                            </p>
                            <span>
                              Un agent ANOC va vous appeler pour vous informer
                              de l'heure exacte de livraison au point de relais
                              spécifié en haut
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h4>Détails paiement</h4>
                    <div class="checkout__input bg-ligh text-danger h6 center">
                      <p>
                        <b>Mode de paiement</b>
                      </p>
                      <span>
                        <b>Virement bancaire</b>
                      </span>
                      <br></br>
                      <br></br>
                      
                    </div>
                    <div class="checkout__input">
                            <b>
                              Choix du paiement<span>*</span>
                            </b>
                            <div className="col-lg-9 col-md-9">
                              <Select
                                value={selectedOptionPaiment}
                                onChange={this.handleChangeModepaiement}
                                options={optionpaiment}
                                placeholder="payer le montant totale"

                                // className="Select"
                              />
                              <br></br>
                            </div>
                          </div>
                          
                    <h6>
                      Vous devez accepter{" "}
                      <a href="./Regles">
                        <b>
                          <u>les conditions générales de vente et achat</u>
                        </b>
                      </a>{" "}
                      pour continuer.
                    </h6>
                    <br></br>
                    <div class="checkout__input__checkbox">
                      <label for="regles">
                        J'accepte les conditions générales des règles de vente
                        et achat
                        <input
                          type="checkbox"
                          id="regles"
                          required
                          onChange={this.onChangecheck}
                        />
                        <span class="checkmark"></span>
                      </label>
                    </div>
                    
                    <h4>Détails du prix</h4>



                    <div class="shoping__checkout">
                      <ul>
                      {this.state.Modepaiement?(




                            <div>
                            <li>
                            Avance <span>{this.state.Espece.avance} MAD</span>
                          </li>
                          <li>
                            Prix Transport <span>60 MAD</span>
                          </li>
                          <li>
                            Prix Total{" "}
                            <span>
                              {parseInt(this.state.Espece.prix) + 60} MAD
                            </span>
                          </li>
                            </div>
                          ) : <div>
                            <li>
                            Prix Transport <span>60 MAD</span>
                          </li>
                          <li>
                            Prix Total{" "}
                            <span>
                              {parseInt(this.state.Espece.prix) + 60} MAD
                            </span>
                          </li>
                            
                            
                            </div> }
                        
                        
                        <li>
                          <a href="/ToutesLesAnnonces" class="primary-btn">
                            Annuler commande
                          </a>{" "}
                          <br></br>
                          {this.state.checked && !this.state.Empty ? (
                            <Link
                              to={{
                                pathname: "/AlerteCommande",
                                state: {
                                  id: this.state.Commande,
                                },
                              }}
                            >
                              {" "}
                              <a href="#" class="primary-btn" disabled>
                                Valider
                              </a>{" "}
                            </Link>
                          ) : null}
                        </li>
                      </ul>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          </div>

        </section>
      </div>
    );
  }
}

export default Commander;
