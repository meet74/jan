import React, { useContext, useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import avatar from "assets/img/faces/marc.jpg";
import { AuthContext } from "../../pages/AuthProvider";
import { useAlert } from 'react-alert'
import { db } from "../../firebase";
import NewButton from "@material-ui/core/Button";
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const alert = useAlert()
  const classes = useStyles();
  const { register, user, dataStore} = useContext(AuthContext);
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [deliveryEmail, setdeliveryEmail] = useState("");
  const [deliveryPassword, setdeliveryPassword] = useState("");
  const [showadmin, setshowadmin] = useState(false);
  const [showdelivery, setshowdelivery] = useState(false);
  const emailInput = (event) => {
    setEmail(event.target.value);
  };
  console.log(user.uid);
  
  const passwordInput = (event) => {
    setPassword(event.target.value);
  };
  const deliveryEmailInput = (event) => {
    setdeliveryEmail(event.target.value);
  };
  console.log(user.uid);
  
  const deliveryPasswordInput = (event) => {
    setdeliveryPassword(event.target.value);
  };
  const nameInput = (event) => {
    setname(event.target.value);
  };
  const handleSubmit = async (e) => {
    console.log(email);
    e.preventDefault();
    await register(email, password);
    await dataStore(name);
    alert.show('Admin Successfully Added!!')
  };
  const handleDeliverySubmit = async (e) => {
    console.log(deliveryEmail);
    e.preventDefault();
    await register(deliveryEmail.trim(), deliveryPassword);
    alert.show('Delivery Boy Details Successfully Added!!')
  };


  return (
    <div>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
            <NewButton  style={{width:"100%",backgroundColor:"#EEEEEE",alignTracks:"center",color:"#9E2499"}} onClick={()=>{
              setshowadmin(!showadmin)
            }}>
               Add Admin
             </NewButton>
            {
              showadmin?    <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Add Admin</h4>
                <p className={classes.cardCategoryWhite}>
                  Complete your profile
                </p>
              </CardHeader>
              <CardBody>
              <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <input
                      type="text"
                      placeholder="Name"
                      onChange={nameInput}
                      style={{
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        padding: 5,
                        marginTop: 20,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <input
                      type="text"
                      placeholder="Email address"
                      onChange={emailInput}
                      style={{
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        padding: 5,
                        marginTop: 20,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <input
                      type="password"
                      placeholder="Password"
                      onChange={passwordInput}
                      style={{
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        padding: 5,
                        marginTop: 20,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={handleSubmit}>
                  Add Admin
                </Button>
              </CardFooter>
            </Card>
            :null
            }
            </GridItem>
            <GridItem xs={12} sm={12} md={8}>
            <NewButton  style={{width:"100%",backgroundColor:"#EEEEEE",alignTracks:"center",marginTop:15,color:"#9E2499"}} onClick={()=>{
              setshowdelivery(!showdelivery)
            }}>
               Add Delery Boy Details
             </NewButton>
            {
                showdelivery
                ?
                <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Add Delivery Boy Details</h4>
                  <p className={classes.cardCategoryWhite}>
                    Complete your profile
                  </p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <input
                        type="text"
                        placeholder="Email address"
                        onChange={deliveryEmailInput}
                        style={{
                          borderTop: "none",
                          borderLeft: "none",
                          borderRight: "none",
                          padding: 5,
                          marginTop: 20,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <input
                        type="password"
                        placeholder="Password"
                        onChange={deliveryPasswordInput}
                        style={{
                          borderTop: "none",
                          borderLeft: "none",
                          borderRight: "none",
                          padding: 5,
                          marginTop: 20,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button color="primary" onClick={handleDeliverySubmit}>
                    Add Delivery Boy Details
                  </Button>
                </CardFooter>
              </Card>
                :null
              }
           
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card profile>
                <CardAvatar profile>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img src={avatar} alt="..." />
                  </a>
                </CardAvatar>
                <CardBody profile>
                  <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
                  <h4 className={classes.cardTitle}>Alec Thompson</h4>
                  <p className={classes.description}>
                    Don{"'"}t be scared of the truth because we need to restart
                    the human foundation in truth And I love you like Kanye
                    loves Kanye I love Rick Owens’ bed design but the back is...
                  </p>
                  <Button color="primary" round>
                    Follow
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
    </div>
  );
}
