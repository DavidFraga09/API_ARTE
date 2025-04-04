import React, { useState, useEffect } from "react";
import { 
  Paper, 
  InputBase, 
  IconButton, 
  Card, 
  Typography, 
  Box, 
  CircularProgress, 
  Fade,
  Container,
  Divider,
  Chip
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SearchIcon from "@mui/icons-material/Search";
import MuseumIcon from '@mui/icons-material/Museum';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import HistoryIcon from '@mui/icons-material/History';
import { alpha } from '@mui/material/styles';
import ContenidoArte from "./ContenidoArte";

export default function HomePage() {
  const [textoBuscar, setTextoBuscar] = useState("Picasso");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lista ampliada de campos a solicitar
  const campos = "id,title,image_id,artist_display,date_display,place_of_origin,medium_display,dimensions,style_title";

  const obtenerArtePorNombre = async () => {
    const buscar = textoBuscar.trim();
    if (buscar === "") {
      alert("Campo vacío, pon algo mínimo");
    } else {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.artic.edu/api/v1/artworks/search?q=${buscar}&fields=${campos}`
        );
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const obtenerData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.artic.edu/api/v1/artworks?fields=${campos}&limit=20`
        );
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    obtenerData();
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      obtenerArtePorNombre();
    }
  };

  return (
    <Box 
      sx={{
        bgcolor: '#FAFAFA',
        minHeight: '100vh',
        pb: 8
      }}
    >
      {/* Hero Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(90deg, #000000 0%, #434343 100%)',
          pt: { xs: 6, md: 10 },
          pb: { xs: 8, md: 12 },
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          mb: 5,
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url(https://source.unsplash.com/random/1600x900/?museum,art) no-repeat center center',
            backgroundSize: 'cover',
            opacity: 0.2,
            zIndex: 0
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Fade in={true} timeout={1000}>
            <Box>
              <Typography 
                variant="overline" 
                sx={{ 
                  color: '#FFC107',
                  fontWeight: 500,
                  letterSpacing: 2,
                  display: 'block',
                  mb: 1
                }}
              >
                COLECCIÓN DIGITAL DE ARTE
              </Typography>
              <Typography 
                variant="h2" 
                component="h1" 
                sx={{ 
                  fontFamily: '"Georgia", serif',
                  fontWeight: 700,
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' },
                  letterSpacing: -0.5,
                  lineHeight: 1.1,
                  mb: 3,
                  maxWidth: '800px',
                  color: 'white'
                }}
              >
                Explora Obras Maestras del Arte Mundial
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 400,
                  color: '#E0E0E0',
                  maxWidth: '700px',
                  mb: 5,
                  lineHeight: 1.5
                }}
              >
                Accede a una colección digital de arte de los mejores museos e instituciones culturales del mundo.
              </Typography>
              
              <Card 
                sx={{ 
                  maxWidth: '700px',
                  borderRadius: "8px", 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                  p: 0,
                  bgcolor: 'white',
                  overflow: 'visible',
                  position: 'relative',
                  top: { xs: 20, md: 40 }
                }}
              >
                <Paper
                  component="form"
                  onSubmit={(e) => e.preventDefault()}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "8px",
                    boxShadow: 'none',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <IconButton
                    sx={{ 
                      p: 2,
                      color: '#757575'
                    }}
                    disabled
                  >
                    <MuseumIcon />
                  </IconButton>
                  <InputBase
                    sx={{ 
                      flex: 1, 
                      fontSize: "16px",
                      py: 1.5,
                      color: '#212121',
                      '&::placeholder': {
                        color: '#9E9E9E'
                      }
                    }}
                    placeholder="Buscar por artista, obra, movimiento o época..."
                    value={textoBuscar}
                    onChange={(e) => setTextoBuscar(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                  <Divider sx={{ height: 28, mx: 1 }} orientation="vertical" />
                  <IconButton 
                    color="primary"
                    sx={{ 
                      bgcolor: '#1A237E',
                      color: 'white',
                      height: '100%',
                      borderRadius: 0,
                      px: 3,
                      '&:hover': {
                        bgcolor: '#303F9F'
                      }
                    }}
                    onClick={obtenerArtePorNombre} 
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Card>
            </Box>
          </Fade>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Búsquedas populares */}
        <Box sx={{ mb: 5, mt: { xs: 7, md: 8 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 500, color: '#424242', display: 'flex', alignItems: 'center' }}>
              <HistoryIcon sx={{ mr: 1, fontSize: 20, color: '#757575' }} />
              Búsquedas populares
            </Typography>
            <Typography variant="body2" sx={{ color: '#757575', display: { xs: 'none', sm: 'block' } }}>
              Explora categorías destacadas
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {["Impresionismo", "Picasso", "Van Gogh", "Renacimiento", "Arte Moderno", "Dalí", "Monet", "Abstracto"].map(tag => (
              <Chip 
                key={tag}
                label={tag}
                onClick={() => {
                  setTextoBuscar(tag);
                  obtenerArtePorNombre();
                }}
                sx={{ 
                  bgcolor: '#EEEEEE', 
                  '&:hover': { 
                    bgcolor: '#E0E0E0',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  },
                  transition: 'all 0.2s',
                  fontWeight: 500,
                  borderRadius: 1.5,
                  py: 0.5
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Filtros y contenido principal */}
        <Box>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 3,
              pb: 2,
              borderBottom: '1px solid #EEEEEE'
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#212121' }}>
              {loading ? 'Buscando resultados...' : `Galería de arte (${data.length} obras)`}
            </Typography>
            
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              <FilterAltIcon sx={{ color: '#757575', mr: 1 }} />
              <Typography variant="body2" sx={{ color: '#757575', fontWeight: 500 }}>
                Ordenar por:
              </Typography>
              <Chip 
                label="Relevancia" 
                variant="outlined" 
                size="small"
                sx={{ ml: 1, borderColor: '#BDBDBD' }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
      
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress 
            sx={{ 
              color: '#1A237E' 
            }} 
            size={40} 
          />
          <Typography variant="body2" sx={{ ml: 2, color: '#757575' }}>
            Cargando obras de arte...
          </Typography>
        </Box>
      )}
      
      <Container maxWidth="lg">
        <Box>
          <ContenidoArte data={data} loading={loading} />
        </Box>
      </Container>
    </Box>
  );
}