import { Routes,Route } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UseContext";
import { Alert } from "react-bootstrap";
const PrivateRoute = (props) => {
    const {user} = useContext(UserContext);

    if(user && !user.auth){
        return <>
            You don't have permisson to acess this route
            <Alert variant="warning">
      <Alert.Heading>Hey, nice to see you</Alert.Heading>
        <p>
            Aww yeah, you need login read this important alert message. This
            example text is going to run a bit longer so that you can see how
            spacing within an alert works with this kind of content.
        </p>
        <hr />
    </Alert>
        </>
    }
    return( 
        <>
            {props.children}
        </>
    )
}

export default PrivateRoute;