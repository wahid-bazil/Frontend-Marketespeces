import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";
import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel'  
import {Spring} from 'react-spring/renderprops'
import Especes from "./ach_Especes_annonces";
import Pagination from "./pagination";





class HomeSheeps extends Component {
  constructor() {
    super();
    // let redirect = false;
    this.state = {
      
      Annonces: [],
      loading:false,
      currentPage:1,
      AnnoncesPerPage:5,
      selectedOptionRace:"",
      selectedOptions:"",
      optionsRace: [
        { value: "Sardi", label: "Sardi" },
        { value: "Bargui", label: "Bargui" },
      ],

      selectedOptionVille: null,
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
      sortoptions:[
        {value:'prix',label:'prix'},
        {value:'poids',label:'poids'},
        {value:'age',label:'age'}
      ],
      conditions: {
        statut: "disponible",
        order_by: "race",
        order_mode: "asc",
      },
      redirect: false,
    };
    this.onChange = this.onChange.bind(this);
    this.handelChercher = this.handelChercher.bind(this);
    // this.handleFavoris=this.handleFavoris.bind(this)
  }

  handleChangeRace = (selectedOptionRace) => {
    this.setState({ selectedOptionRace }, () =>
      this.setState({
        conditions: Object.assign(this.state.conditions, {
          race: this.state.selectedOptionRace.value,
        }),
      })
    );
  };

  handleChangeVille = (selectedOptionVille) => {
    this.setState({ selectedOptionVille }, () =>
      this.setState({
        conditions: Object.assign(this.state.conditions, {
          localisation: this.state.selectedOptionVille.value,
        }),
      })
    );
  };

  componentDidMount() {
    // const token = localStorage.getItem("usertoken");
    // if (!token) {
    //   this.props.history.push("/login");
    // } else {
    //   console.log(token)
    axios
      .get("http://127.0.0.1:8000/api/Espece", {
        headers: {
          // "x-access-token": token, // the token is a variable which holds the token
          "Content-Type": "application/json",
        },
        params: {
          statut: "disponible",
          order_by: "race",
          order_mode: "asc",
        },
      })
      .then((res) => {
        this.setState({
          Annonces: res.data,
        });
      });
  }

  onChange(e) {
    const n = e.target.name,
      v = e.target.value;

    this.setState({
      conditions: Object.assign(this.state.conditions, { [n]: v }),
    });
  }
  handlesort=(selectedOptions) => {
    this.setState({ selectedOptions }, () =>
      this.setState({
        conditions: Object.assign(this.state.conditions, {
          order_by: this.state.selectedOptions.value,
        }),
      })
    );
    const token = localStorage.getItem("usertoken");
    if (!token) {
      this.props.history.push("/login");
    } else {
      console.log(token);
      axios
        .get("http://127.0.0.1:8000/api/Espece", {
          headers: {
            // "x-access-token": token, // the token is a variable which holds the token
            "Content-Type": "application/json",
          },
          params: this.state.conditions,
        })
        .then((res) => {
          this.setState({
            Annonces: res.data,
          });
        });
    }
  }
 

  handelChercher() {
    const token = localStorage.getItem("usertoken");
    if (!token) {
      this.props.history.push("/login");
    } else {
      console.log(token);
      axios
        .get("http://127.0.0.1:8000/api/Espece", {
          headers: {
            // "x-access-token": token, // the token is a variable which holds the token
            "Content-Type": "application/json",
          },
          params: this.state.conditions,
        })
        .then((res) => {
          this.setState({
            Annonces: res.data,
          });
        });
    }
  }

  // handleFavoris(Mid) {
  //   console.log(Mid);
  //   const token = localStorage.getItem("usertoken");
  //   if (!token) {
  //     this.props.history.push("/login");
  //   } else {
  //     // console.log(token);
  //     axios
  //       .put(
  //         "http://127.0.0.1:8000/api/consommateur/" + token + "/favoris",{ id_mouton: Mid }

  //        , {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }

  //       )
  //       .then((res) => {});
  //   }
  // }

  render() {
    const { selectedOptionRace } = this.state;
    const { optionsRace } = this.state;
    const { selectedOptionVille } = this.state;
    const { optionsVille } = this.state;
    const {sortoptions}=this.state;
    const {selectedOptions}=this.state
    const indexOfLastAnnonce=this.state.currentPage*this.state.AnnoncesPerPage;
    const indexOfFirstAnnonce=indexOfLastAnnonce-this.state.AnnoncesPerPage;
    const currentAnnonoces=this.state.Annonces.slice(indexOfFirstAnnonce,indexOfLastAnnonce);
    const paginate=(pageNumber) => {
    
      this.setState({
        currentPage:pageNumber
      })
    }
    return (
      <div >
        {/* <!-- Page Preloder --> */}
        {/* <div id="preloder">
          <div className="loader"></div>
        </div> */}

        <div class='container-fluid' >  
          <div className="row title" style={{ marginBottom: "80px"}} >    
              </div>  
                </div>  
                  <div className='container-fluid' >  
                      <Carousel>  
                         <Carousel.Item style={{'height':"200px"}} >  
                            <img style={{'height':"200px"}}  
                              className="d-block w-100"  
                              src={'assets/img/x.jpg'} />  
                              <Carousel.Caption>  
                                <h1>YOUR SHOP</h1>
                                <h5>First Demo </h5>  
                             </Carousel.Caption>  
                          </Carousel.Item  >  
                           <Carousel.Item style={{'height':"200px"}}>  
                              <img style={{'height':"200px"}}  
                                 className="d-block w-100"  
                                 src={'assets/img/x.jpg'}    />  
                                 <Carousel.Caption>  
                                   <h1>YOUR SHOP</h1>
                                   <h5>Second Demo</h5>  
                                 </Carousel.Caption>  
                           </Carousel.Item>  
                                       <Carousel.Item style={{'height':"200px"}}>  
                                       <img style={{'height':"200px"}}  
                                        className="d-block w-100"  
                                         src={'assets/img/x.jpg'}   />  
                                        <Carousel.Caption> 
                                        <h1>YOUR SHOP</h1>
 
                                          <h5>Third Demo</h5>  
                                          </Carousel.Caption>  
                                         </Carousel.Item>  
                                        </Carousel>  
            </div>  
      
          <div className="container1">
          <div class='container-fluid' >  
          <div className="row title" style={{ marginBottom: "80px"}} >    
              </div>  
                </div>  
                  <div className='container-fluid' >  
                      <Carousel>  
                         <Carousel.Item style={{'height':"200px"}} >  
                            <img style={{'height':"200px"}}  
                              className="d-block w-100"  
                              src={'assets/img/x.jpg'} />  
                              <Carousel.Caption>  
                                <h1>insert image here</h1>
                                
                             </Carousel.Caption>  
                          </Carousel.Item  >  
                           <Carousel.Item style={{'height':"200px"}}>  
                              <img style={{'height':"200px"}}  
                                 className="d-block w-100"  
                                 src={'assets/img/x.jpg'}    />  
                                 <Carousel.Caption>  
                                   <h1>insert image here</h1>
                                 
                                 </Carousel.Caption>  
                           </Carousel.Item>  
                                       <Carousel.Item style={{'height':"200px"}}>  
                                       <img style={{'height':"200px"}}  
                                        className="d-block w-100"  
                                         src={'assets/img/x.jpg'}   />  
                                        <Carousel.Caption> 
                                        <h1>insert image here</h1>
 
                                          
                                          </Carousel.Caption>  
                                         </Carousel.Item>  
                                        </Carousel>  
            </div>  

          <div className="container0">
            
                <div className="sidebar">
                  <div className="sidebar__item">
                    <h4>Rechercher</h4>
                  <div className="sidebar_price">
                    <i class="fas fa-tags"> <h6>Prix</h6></i>
                  <div className="row">
                      <input
                        type="text"
                        className="inp"
                        placeholder="Budget min"
                        name="prix_min"
                        onChange={this.onChange}
                      />
                 </div>
                 
                  <div className="row">
                   
                      <input
                        type="text"
                        className="inp"
                        placeholder="Budget max"
                        name="prix_max"
                        onChange={this.onChange}
                      />
                    </div>
              
                    </div>
                    <br></br>
                    <hr className="line"></hr>
                    <div className="sidebar_race">
                    <i class="fas fa-genderless"><h6 >Race</h6></i>

                  
                    
                        {/* <input
                          type="text"
                          className="latest-product__item"
                          placeholder="Choisissez la race"
                          onChange={this.onChange}
                          name="race"
                        /> */}
                                            <br></br>
                                          

                
                             <Select
                   
                   value={selectedOptionRace}
                   onChange={this.handleChangeRace}
                   options={optionsRace}
                   placeholder="Race"
                   required
                   className="Sort-select"
                   
                 />
              
                        <br></br>
                      </div>
                      <hr className="line"></hr>

                    
                    <div className="sidebar_poids">
                      <i class="fas fa-weight-hanging"><h6 >Poids Environ</h6></i>
                    
                    <div className="row">
                    
                        <input
                          type="text"
                          className="inp"
                          placeholder="Poids min"
                          name="poids_min"
                          onChange={this.onChange}
                        />
                     
                    </div>
                    <div className="row">
            
                        <input
                          type="text"
                          className="inp"
                          placeholder="Poids max"
                          name="poids_max"
                          onChange={this.onChange}
                        />

                    </div>
                    </div>  
                    <br></br>
                    <hr className="line"></hr>
                   <div className="sidebar_ville">
                   <i class="fas fa-map-marker-alt"><h6 >Ville</h6></i>
              
               
                    
                        <Select
                          value={selectedOptionVille}
                          onChange={this.handleChangeVille}
                          options={optionsVille}
                          placeholder="Ville"
                          className="ville-select"

                          // className="Select"
                        />
                        <br></br>
                      <hr className="line"></hr>
                   
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        {/* <button className="btn btn-success" onClick={this.handelChercher}> Rechercher </button><br/> */}
                        <button
                          className=" site-btn"
                          onClick={this.handelChercher}
                        >
                          {" "}
                          Rechercher{" "}
                        </button>
                      </div>
                    </div>

                    {/* <label className="latest-product__item">
                      <input name="withImages" type="checkbox" /> Avec photos
                    </label> */}

                    {/* <label className="latest-product__item">
                      <input name="withVideos" type="checkbox" /> Avec video
                    </label> */}
                  </div>
                </div>
             

                <div className="containerim">
                      <div className="containerim_top">
                        <h2>
                          <span>{this.state.Annonces.length}</span> Espece
                          disponibles à vendre 
                        </h2>
                        <div className="tri">
                        <i class="fas fa-sort-amount-up"></i>
                        </div>
                        <Select
                        
                   
                   value={selectedOptions}
                   onChange={this.handlesort}
                   options={sortoptions}
                   placeholder={"Lister par :"+selectedOptions}
                   required
                   className="espece-select"
                   
                 />

              
                      </div>
                      <hr></hr>
                    
                

                {/*<!-- Sheeps Grid Section Begin --> */}

                <Spring
               from={{opacity:0,marginRight:-250}}
               to={{opacity:1,marginRight:0}}
               config={{delay:1000,duration:1000}}
               >
                 {props =>(
                   <div style={props}>
                <Especes title={currentAnnonoces} loading={this.state.loading} />
                </div>
                 )}
                 </Spring>
                
                  
   
                 <Pagination postsPerPage={this.state.AnnoncesPerPage}  totalPosts={this.state.Annonces.length} paginate={paginate}/>
                              
                {/* <!-- Sheeps Grid Section End --> */}

                {/* <div className="product__pagination">
                  <a href="#">1</a>
                  <a href="#">2</a>
                  <a href="#">3</a>
                  <a href="#">
                    <i className="fa fa-long-arrow-right"></i>
                  </a>
                </div> */}
              </div>
              </div>
              </div>
            
        
        
      </div>
    );
  }
}

export default HomeSheeps;
