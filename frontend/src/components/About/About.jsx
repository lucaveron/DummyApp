import React from "react";
import { Container, Card } from "react-bootstrap";
import './About.css';

const About = () => {
  return (
    <Container className="about-container p-4">
    <Card className="about-card">
      <Card.Body>
        <Card.Title>Acerca de Dummy App</Card.Title>
        <Card.Text>
          Dummy App es una aplicación web desarrollada como parte de una prueba técnica con un tiempo máximo de 4 horas.
           La finalidad de esta aplicación es demostrar habilidades en la integración de APIs, autenticación de usuarios con GoogleSignIn, y desarrollo Frontend.
        </Card.Text>
        <Card.Text>
          La aplicación permite ver publicaciones con imagen principal, etiquetas y el usuario que las publica. 
          Al hacer clic en una publicación, se pueden visualizar los comentarios asociados a esta. Además, ofrece un listado de etiquetas disponibles para filtrar
           las publicaciones de acuerdo a las mismas.
        </Card.Text>
        <Card.Text>
          También se ha implementado una vista protegida con autenticación mediante Google SignIn. Cabe aclarar que, dado que se trata de una prueba técnica y no 
          se cuenta con una base de datos real, el inicio de sesión es un boceto y solo permite ingresar mediante Google.
        </Card.Text>
      </Card.Body>
    </Card>
  </Container>
  );
};

export default About;
