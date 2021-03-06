import React, { Component } from "react";
import YouTube from 'react-youtube';

import axios from "axios";

class Apropos extends Component {
  render() {

    const opts = {
        height: '390',
        width: '500'
      };

    return (
        <section className="product spad">
        <div className="container">
          <div class="col-lg-12 col-md-6">
            <h3>Qui sommes nous ?</h3> <br></br>
            <h5>L’ANOC (Association Nationale Ovine et Caprine) est une association à but non lucratif qui a pour mission principale l’amélioration du revenu de l’éleveur ovin et caprin ainsi que la valorisation de son métier, notamment dans des conditions assez difficiles du milieu rural. Ainsi que la contribution au développement économique et rural par le développement de l’élevage des petits ruminants et la promotion de ses produits.</h5>
            <br></br>
            <br></br>
            <h3>Nos objectifs ?</h3> <br></br>
            <ul>
                <li>Développer l’élevage ovin caprin et préserver le patrimoine animal national ;</li>
                <li>Améliorer les revenus des éleveurs de petits ruminants ;</li>
                <li>Défendre l’intérêt des éleveurs et du secteur notamment dans les politiques publiques.</li>
                <li>Organiser et améliorer la technicité des éleveurs;</li>
                <li>Améliorer la productivité des races ovines et caprines au Maroc;</li>
                <li>Contribuer à la valorisation marchande des produits et sous-produits de l’élevage;</li>
                <li>Diffuser les bonnes pratiques en matière de conduite de troupeau (santé animale, alimentation,  reproduction, hygiène des bâtiments,…);</li>           
            </ul>

            <br></br>
            <div className="row">
                <div className="col-lg-6 col-md-6">
                    <YouTube videoId="WlKkq-p2oJE" opts={opts} />
                </div>
                <div className="col-lg-6 col-md-6">
                     <YouTube videoId="spT3_hLoGVA" opts={opts} />
                 </div>
            </div>
            <div className="row">
                 <div className="col-lg-6 col-md-6">
                    <YouTube videoId="8nw9TuE3vWw" opts={opts} />
                </div>
                <div className="col-lg-6 col-md-6">
                     <YouTube videoId="Heq0JIjj8Po" opts={opts} />
                 </div>
            </div>
            
          </div>
        </div>
      </section>

    );
  }
}

export default Apropos;
