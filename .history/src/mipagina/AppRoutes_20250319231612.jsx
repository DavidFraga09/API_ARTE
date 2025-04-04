import { Route, Routes } from 'react-router-dom'
// Importación de componentes para cada una de las páginas de la aplicación
import PageHome from './home/pageHome'
import PageContact from './contact/pageContact'
import PageAbout from './about/pageAbout'
import HomePage from '../pages/HomePage'
import NotFound from './NotFound'
import DetalleArte from '../pages/DetalleArte'
import { AlumnoPromedio } from '../components/AlumnoPromedio'
import { ContenedorAprobado } from '../components/Alumnospro/ContenedorAprobado'
import { ContenedorReprobado } from '../components/Alumnospro/ContenedorReprobado'
import MainTienda from '../components/Tienda/MainTienda/MainTienda'
import Objectos_Tienda from '../components/Tienda/Objectos_Tienda/Objectos_Tienda'

export default function AppRoutes () {
    return (
        <Routes>
            {/* Ruta para la página de inicio */}
            <Route path='/home' element={<PageHome/>} />
            {/* Rutas para las páginas "Acerca de" y "Contacto" */}
            <Route path='/about' element={<PageAbout/>} />
            <Route path='/contact' element={<PageContact/>} />
            
            {/* Rutas anidadas para la sección de obras de arte */}
            <Route path='/obras-arte'>
                {/* Ruta principal de obras de arte */}
                <Route index element={<HomePage/>}/>
                {/* Ruta dinámica para mostrar el detalle de una obra de arte */}
                <Route path=':id' element={<DetalleArte/>}/> 
            </Route>

            {/* Nueva ruta para mantener compatibilidad con los enlaces existentes */}
            <Route path='/detalle-arte/:id' element={<DetalleArte/>}/>

            <Route path="/promedio">
                {/* Ruta principal del Alumno Promedio */}
                <Route index element={<AlumnoPromedio/>}/>
                {/* Ruta secundaria para alumnos aprobados */}
                <Route path=':aprobado' element={<ContenedorAprobado/>}/>
                {/* Ruta terciaria para alumnos reprobados */}
                <Route path=':reprobado' element={<ContenedorReprobado/>}/>
            </Route>
            <Route path="/tienda">
                {/* Ruta principal del Alumno Promedio */}
                <Route index element={<MainTienda/>}/>
                {/* Ruta secundaria para productos de la tienda */}
                <Route path=':productos' element={<Objectos_Tienda/>}/>
            </Route>
            {/* Ruta comodín para capturar cualquier ruta no definida y mostrar la página NotFound */}
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    )
} 
