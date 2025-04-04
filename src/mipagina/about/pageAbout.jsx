import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Link,
  Box,
  Divider,
} from "@mui/material";
import { Email, GitHub } from "@mui/icons-material";
import "./PageAbout.css";

export default function PageAbout() {
  return (
    <Box className="background">
      <Container maxWidth="md" className="portfolio-container">
        {/* Sección de perfil */}
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={4} className="profile-container">
            <Avatar
              src="https://avatars.githubusercontent.com/u/181181716?s=400&u=aa1c5c11f695c267ba1fed24a2c92cdc8281c7e0&v=4"
              alt="Profile Picture"
              sx={{ width: 150, height: 150, boxShadow: 5, border: "1px solid #63f2ff" }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" className="title">
               Hola, soy David Dominguez
            </Typography>
            <Typography variant="subtitle1" className="subtitle">
              Desarrollador Web & Apasionado por la Tecnología
            </Typography>
            <Typography className="description">
              Soy un apasionado del desarrollo web y siempre estoy en busca de aprender nuevas tecnologías.
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Sección de habilidades */}
        <Typography variant="h5" className="skills-title" gutterBottom>
          Habilidades
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {["JavaScript", "React", "Python"].map((skill, index) => (
            <Grid item key={index}>
              <Card className="skill-card">
                <CardContent className="skill-content">
                  <Typography variant="body1" className="skill-name">
                    {skill}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Sección de contacto */}
        <Typography variant="h5" className="contact-title" gutterBottom>
          Contáctame
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <IconButton href="mailto:dominguezfragadavid@gmail.com" color="primary">
              <Email fontSize="large" />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton href="https://github.com/DavidFraga09" target="_blank" color="inherit">
              <GitHub fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
