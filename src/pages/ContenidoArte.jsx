import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, CardMedia, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";

export default function ContenidoArte({ data }) {
  const navigate = useNavigate();

  // Función para manejar cuando no hay imagen disponible
  const getImageUrl = (image_id) => {
    if (image_id) {
      return `https://www.artic.edu/iiif/2/${image_id}/full/800,/0/default.jpg`;
    }
    return "https://via.placeholder.com/800x400?text=Imagen+No+Disponible";
  };

  return (
    <Grid container padding={4} spacing={4} justifyContent="center">
      {data && data.length > 0 ? (
        data.map((artwork) => (
          <Grid key={artwork.id} item xs={12} sm={6} md={4} lg={3}>
            <div style={{ padding: "10px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
              <CardMedia
                component="img"
                height="200"
                image={getImageUrl(artwork.image_id)}
                alt={artwork.title}
                sx={{ borderRadius: "10px", marginBottom: "10px", objectFit: "cover" }}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/800x400?text=Imagen+No+Disponible";
                }}
              />
              <Typography variant="h6" align="center" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                {artwork.title || "Sin título"}
              </Typography>
              
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="body1"><strong>Información Básica</strong></Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">
                    <strong>Título:</strong> {artwork.title || "Desconocido"} <br />
                    <strong>Artista:</strong> {artwork.artist_display || "Desconocido"} <br />
                    <strong>Fecha:</strong> {artwork.date_display || "Desconocido"} <br />
                    <strong>Origen:</strong> {artwork.place_of_origin || "Desconocido"} <br />
                    <strong>ID de la obra:</strong> {artwork.id || "No disponible"} <br />
                    <strong>Detalles adicionales:</strong> {artwork.description && artwork.description.trim() !== "" ? artwork.description : "Desconocido"} <br />
                  </Typography>
                </AccordionDetails>
              </Accordion>
              
              <Button 
                variant="contained" 
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => navigate(`/detalle-arte/${artwork.id}`)}
              >
                Ver Detalles
              </Button>
            </div>
          </Grid>
        ))
      ) : (
        <Typography variant="h6" align="center" sx={{ width: "100%" }}>
          No se encontraron obras de arte.
        </Typography>
      )}
    </Grid>
  );
}
