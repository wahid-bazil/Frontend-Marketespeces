import React, { Component } from "react";
import axios from "axios";

class Header extends Component {
  constructor() {
    super();
    // let redirect = false;
    this.state = {
      isLoged: false,
    };
    // this.HandelLogout = this.HandelLogout.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem("usertoken");
    if (token) {
      this.setState({ isLoged: true });
      // this.props.history.push("/login");
    }

    //Ce bout de code permet de vérifier les commandes avec un deadline dépassé et les annuler
    // avec envoie d'un email au consommateur relatif à la commande pour l'informer de l'annulation automatique
    // var now = new Date("22 Jul 2020 16:00:00 GMT");
    var now = new Date();
    axios
      .get(
        "http://127.0.0.1:8000/api/commandes/",
        {
          //   msg_refus_avance: this.state.dataUrl,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        var resultat = res;
        for (let i = 0; i < res.data.length; i++) {
          console.log(res.data[i].deadline);
          var deadline = new Date(res.data[i].deadline);
          if (
            now.getTime() >= deadline.getTime() &&
            res.data[i].statut == "en attente de paiement avance"
          ) {
            axios
              .put(
                "http://127.0.0.1:8000/api/commande/" + res.data[i]._id,
                {
                  //   msg_refus_avance: this.state.dataUrl,
                  statut: "commande annulée (deadline dépassé)",
                },
                {
                  headers: { "Content-Type": "application/json" },
                }
              )
              .then(() => {
                console.log(resultat);
                const to = resultat.data[i].consommateur.email;
                //console.log(to);
                const content =
                  "Votre commande a été annulée automatiquement car vous avez dépassé le deadline prévu pour l'importation de votre reçu de paiement.";
                const subject =
                  "Votre commande a été annulée (dépassement du deadline)";
                axios.post(
                  "http://127.0.0.1:8000/api/sendmail/" +
                    to +
                    "/" +
                    content +
                    "/" +
                    subject,
                  {
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                      // "Access-Control-Allow-Origin": "*",
                    },
                  }
                );
              });
          }
        }
      });
  }

  logout() {
    this.setState(
      {
        isLoged: false,
      },()=>localStorage.removeItem("usertoken")
    );
    
  }

  render() {
    return (
      <div>
        <header className="header_u">
         <div className="header__logo">
                  <a href="./index.html">
                    <img  src="assets/img/logo.png" alt="" />
                  </a>
         </div>

         <nav className="nav_links">
         
        <ul className="nav_links0" >
        <li><a class="active"  href="./ToutesLesAnnonces">Nous mouton</a></li>
        <li><a href="./AnnoncesParEleveurs">Nous eleveur</a>  </li>
        {this.state.isLoged ? (

          
          <li><a href="#"> Mes commandes </a></li>
      
          ) : null}
        {this.state.isLoged ? (

          <li>

         
          <a href="#">Mes favoris</a>
          </li>
          ) : null}
        </ul>
        <ul class="ul_right">
          <li>
            <i class="fas fa-cart-plus"></i>
            <a href="#">Panier</a>
          </li>
      
          {this.state.isLoged ? (
          <li>
            <a href="/login" onClick={this.logout}>se deconnecter</a>
            <i class="fas fa-sign-in-alt"></i>
          </li>
           ) : null}
           {!this.state.isLoged ? (
            <li>
            <a href="/login" >se connecter</a>
            <i class="fas fa-sign-in-alt"></i>
          </li>
            ) : null}

        </ul>
      </nav>
      </header>
      </div>
    );
  }
}

export default Header;
