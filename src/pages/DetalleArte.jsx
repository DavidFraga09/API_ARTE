import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  CardContent,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CardMedia,
  Box,
  Chip,
  Divider,
  CircularProgress
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Grid from "@mui/material/Grid2";

export default function DetalleArte() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtworkDetails = async () => {
      try {
        setLoading(true);
        // Solicitamos todos los campos relevantes de la API
        const response = await fetch(`https://api.artic.edu/api/v1/artworks/${id}?fields=id,title,image_id,artist_display,artist_title,date_display,dimensions,medium_display,provenance_text,exhibition_history,description,category_titles,style_title,theme_titles,material_titles,technique_titles,place_of_origin,credit_line,publication_history,catalogue_raisonne,classification_title,subject_titles,color,alt_text,inscriptions`);
        const result = await response.json();
        
        if (result.data) {
          setArtwork(result.data);
        } else {
          setError("No se encontró la obra de arte solicitada");
        }
      } catch (error) {
        console.error("Error al obtener los detalles de la obra de arte:", error);
        setError("Ocurrió un error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchArtworkDetails();
  }, [id]);

  // URL de la imagen
  const getImageUrl = (image_id) => {
    if (image_id) {
      return `https://www.artic.edu/iiif/2/${image_id}/full/1200,/0/default.jpg`;
    }
    return "https://via.placeholder.com/1200x800?text=Imagen+No+Disponible";
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', backgroundColor: '#f5f5f5' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4, p: 2 }}>
        <Typography variant="h5" color="error">{error}</Typography>
        <Button 
          variant="contained" 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Volver
        </Button>
      </Box>
    );
  }

  if (!artwork) {
    return <Typography sx={{ textAlign: "center", marginTop: 4 }}>No se encontraron datos para esta obra.</Typography>;
  }

  return (
    <div >
      <Button 
        variant="outlined" 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate(-1)}
        sx={{ margin: 2 }}
      >
        Volver
      </Button>
      
      <Grid container padding={2} spacing={2} justifyContent="center" >
        <Grid xs={12} md={10} lg={8} BackgroundColor="#f5f5f5">
          <Paper sx={{ padding: 3, borderRadius: "10px", overflow: "hidden" }} >
            <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 2, fontWeight: "bold" }}>
              {artwork.title}
            </Typography>
            
            {/* Imagen de la obra */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }} >
              <CardMedia
                component="img"
                image={getImageUrl(artwork.image_id)}
                alt={artwork.alt_text || artwork.title}
                sx={{ 
                  maxHeight: '500px', 
                  width: 'auto', 
                  maxWidth: '100%', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                }}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/1200x800?text=Imagen+No+Disponible";
                }}
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Información básica */}
            <Box sx={{ mb: 3 }} >
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 500 }}>Información Básica</Typography>
              <Grid container spacing={2}>
                <Grid xs={12} sm={6}>
                  <Typography variant="body1">
                    <strong>Artista:</strong> {artwork.artist_title || artwork.artist_display || "Desconocido"}
                  </Typography>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Typography variant="body1">
                    <strong>Año:</strong> {artwork.date_display || "No disponible"}
                  </Typography>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Typography variant="body1">
                    <strong>Origen:</strong> {artwork.place_of_origin || "No disponible"}
                  </Typography>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Typography variant="body1">
                    <strong>Dimensiones:</strong> {artwork.dimensions || "No especificadas"}
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography variant="body1">
                    <strong>Medio:</strong> {artwork.medium_display || "No disponible"}
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            {/* Categorías y estilos */}
            {(artwork.category_titles?.length > 0 || artwork.style_title || artwork.theme_titles?.length > 0) && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 500 }}>Clasificación</Typography>
                
                {artwork.category_titles?.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>Categorías:</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {artwork.category_titles.map((category, idx) => (
                        <Chip key={idx} label={category} color="primary" variant="outlined" />
                      ))}
                    </Box>
                  </Box>
                )}
                
                {artwork.style_title && (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Estilo:</strong> {artwork.style_title}
                  </Typography>
                )}
                
                {artwork.theme_titles?.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>Temas:</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {artwork.theme_titles.map((theme, idx) => (
                        <Chip key={idx} label={theme} color="secondary" variant="outlined" />
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            )}

            {/* Descripción */}
            {artwork.description && (
              <Accordion defaultExpanded >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Descripción</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                    {artwork.description}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            )}

            {/* Materiales y técnicas */}
            {(artwork.material_titles?.length > 0 || artwork.technique_titles?.length > 0) && (
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Materiales y Técnicas</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {artwork.material_titles?.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ mb: 1 }}>Materiales:</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {artwork.material_titles.map((material, idx) => (
                          <Chip key={idx} label={material} size="small" />
                        ))}
                      </Box>
                    </Box>
                  )}
                  
                  {artwork.technique_titles?.length > 0 && (
                    <Box>
                      <Typography variant="subtitle1" sx={{ mb: 1 }}>Técnicas:</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {artwork.technique_titles.map((technique, idx) => (
                          <Chip key={idx} label={technique} size="small" color="info" />
                        ))}
                      </Box>
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            )}

            {/* Procedencia y exhibición */}
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Procedencia y Exhibición</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {artwork.provenance_text && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1"><strong>Proveniencia:</strong></Typography>
                    <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                      {artwork.provenance_text}
                    </Typography>
                  </Box>
                )}
                
                {artwork.exhibition_history && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1"><strong>Historial de Exhibición:</strong></Typography>
                    <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                      {artwork.exhibition_history}
                    </Typography>
                  </Box>
                )}
                
                {artwork.credit_line && (
                  <Typography variant="body2">
                    <strong>Línea de Crédito:</strong> {artwork.credit_line}
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>

            {/* Inscripciones y detalles adicionales */}
            {(artwork.description || artwork.inscriptions || artwork.color || artwork.catalogue_raisonne || artwork.publication_history) && (
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                  <strong>Detalles Adicionales</strong> 
                  
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {artwork.inscriptions && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1"><strong>Inscripciones:</strong></Typography>
                      <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                        {artwork.inscriptions}
                      </Typography>
                    </Box>
                  )}
                  
                  {artwork.color?.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1"><strong>Colores predominantes:</strong></Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {artwork.color.map((colorHex, idx) => (
                          <Box 
                            key={idx} 
                            sx={{ 
                              width: 30, 
                              height: 30, 
                              bgcolor: colorHex, 
                              borderRadius: '4px',
                              border: '1px solid rgba(0,0,0,0.1)'
                            }} 
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
                  
                  {artwork.publication_history && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1"><strong>Historial de Publicación:</strong></Typography>
                      <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                        {artwork.publication_history}
                      </Typography>
                    </Box>
                  )}
                  
                  {artwork.catalogue_raisonne && (
                    <Typography variant="body2">
                      <strong>Catálogo Razonado:</strong> {artwork.catalogue_raisonne}
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}