import React  from 'react';
import { Link } from "react-router-dom";

const Espece=(props)=>{
    return(
        <div className="row">
           {props.title.map((props) => (
              <div className="row1">
                <div className="product__item">
                  <div  className="product__item__pic set-bg" data-setbg={props.images} >
                       <img 
                        src={props.image_face}
                        // src=Annonces.images
                        className="product__item__pic set-bg"
                       />
                       <ul className="product__item__pic__hover">
                            {/* <li>
                              <a
                                id={Annonces._id}
                                onClick={(e) =>
                                  this.handleFavoris(e.currentTarget.id)
                                }
                              >
                                <i className="fa fa-heart"></i>
                              </a>
                            </li> */}
                            <li>
                              <Link to={`/DetailsMouton/${props._id}`}>
                                <a href="#">
                                  <i class="fa fa-eye"></i>
                                </a>
                              </Link>
                              </li>
                         </ul>
                   </div>   
                   <div className="product__item__text">
                          <h6>{"         " + props.race}</h6>
                          <h6>{"         " + props.poids + " Kg"}</h6>
                          <h6>{"         " + props.age + " mois"}</h6>
                          <h5>{"         " + props.prix + " MAD"}</h5>
                          
                    </div>   
                </div>
             </div>
                    
          ))}
       </div>
    )
}
export default Espece;