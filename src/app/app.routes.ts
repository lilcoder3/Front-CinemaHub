import { Routes } from '@angular/router';
import { Firsthome } from './components/home/firsthome/firsthome';
import { Login } from './components/home/login/login';
import { Secondhome } from './components/home/secondhome/secondhome';
import { segGuard } from './guard/seguridad.guard';
import { Cinemas } from './components/admin-control/cinemas/cinemas';
import { Crearcinemas } from './components/admin-control/cinemas/crearcinemas/crearcinemas';
import { Cinemarooms } from './components/admin-control/cinemarooms/cinemarooms';
import { Crearcinemarooms } from './components/admin-control/cinemarooms/crearcinemarooms/crearcinemarooms';
import { Cities } from './components/admin-control/cities/cities';
import { Crearcities } from './components/admin-control/cities/crearcities/crearcities';
import { Funciones } from './components/client-control/funciones/funciones';
import { Crearfunciones } from './components/client-control/funciones/crearfunciones/crearfunciones';
import { Moviecinema } from './components/admin-control/moviecinema/moviecinema';
import { Crearmoviecinema } from './components/admin-control/moviecinema/crearmoviecinema/crearmoviecinema';
import { Movies } from './components/admin-control/movies/movies';
import { Crearmovies } from './components/admin-control/movies/crearmovies/crearmovies';
import { Review } from './components/client-control/review/review';
import { Crearreviews } from './components/client-control/review/crearreviews/crearreviews';
import { Roles } from './components/admin-control/roles/roles';
import { Crearroles } from './components/admin-control/roles/crearroles/crearroles';
import { Rooms } from './components/admin-control/rooms/rooms';
import { Crearrooms } from './components/admin-control/rooms/crearrooms/crearrooms';
import { Tickets } from './components/client-control/tickets/tickets';
import { Typepayments } from './components/admin-control/typepayments/typepayments';
import { Creartypepayments } from './components/admin-control/typepayments/creartypepayments/creartypepayments';
import { Users } from './components/admin-control/users/users';
import { CrearTicketComponent } from './components/client-control/tickets/creartickets/creartickets';
import { Register } from './components/home/register/register';
import { Reportes } from './components/admin-control/reportes/reportes';
import { FindMovieScheduleDTO } from './components/admin-control/reportes/find-movie-schedule-dto/find-movie-schedule-dto';
import { FindTicketsUsernameDTO } from './components/admin-control/reportes/find-tickets-username-dto/find-tickets-username-dto';
import { GetMovieReviewDTO } from './components/admin-control/reportes/get-movie-review-dto/get-movie-review-dto';
import { QuantityFunctionsCinemaDTO } from './components/admin-control/reportes/quantity-functions-cinema-dto/quantity-functions-cinema-dto';
import { QuantityFunctionsUserDateDTOComponent } from './components/admin-control/reportes/quantity-functions-user-date-dto/quantity-functions-user-date-dto';
import { QuantityFunctionsUserDTO } from './components/admin-control/reportes/quantity-functions-user-dto/quantity-functions-user-dto';
import { QuantityMoviesCityDTOcomponent } from './components/admin-control/reportes/quantity-movies-city-dto/quantity-movies-city-dto';
import { QuantityTicketsCinemaDTOcomponent } from './components/admin-control/reportes/quantity-tickets-cinema-dto/quantity-tickets-cinema-dto';
import { QuantityTotalRevenueByPaymentDTOcomponent } from './components/admin-control/reportes/quantity-total-revenue-by-payment-dto/quantity-total-revenue-by-payment-dto';
import { TotalRevenuewByPaymentDateDTO } from './components/admin-control/reportes/total-revenuew-by-payment-date-dto/total-revenuew-by-payment-date-dto';

export const routes: Routes = [
    {
        path: 'landinghome',component:Firsthome
    },
    {
        path: 'register',component:Register
    },
    {
        path: '',
        redirectTo: 'landinghome',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login,
    
    },
    {
        path: 'home',component:Secondhome,
        canActivate: [segGuard]
    },
    {
        path: 'cinema',
        component: Cinemas,
        children: [
            { path: 'registercinema', component: Crearcinemas },
            { path: 'ediciones/:id', component: Crearcinemas }
        ],
        canActivate: [segGuard]
    },
    {
        path: 'cinemarooms',
        component: Cinemarooms,
        children: [
            { path: 'registrarcinemarooms', component: Crearcinemarooms },
            { path: 'ediciones/:id', component: Crearcinemarooms }
        ],
        canActivate: [segGuard]
    },
    {
        path: 'cities',
        component: Cities,
        children: [
            { path: 'registrarctiy', component: Crearcities },
            { path: 'ediciones/:id', component: Crearcities }
        ],
        canActivate: [segGuard]
    },
    {
        path: 'funcionescine',
        component: Funciones,
        children: [
            { path: 'registrarfuncionescine', component: Crearfunciones },
            { path: 'ediciones/:id', component: Crearfunciones }
        ],
        canActivate: [segGuard]
    },
    {
        path: 'moviecinema',
        component: Moviecinema,
        children: [
            { path: 'registarmoviecinema', component: Crearmoviecinema },
            { path: 'ediciones/:id', component: Crearmoviecinema }
        ],
        canActivate: [segGuard]
    },
    {
        path: 'movies',
        component: Movies,
        children: [
            { path: 'registrarmovie', component: Crearmovies },
            { path: 'ediciones/:id', component: Crearmovies }
        ],
        canActivate: [segGuard]
    },
    {
        path: 'reviews',
        component: Review,
        children: [
            { path: 'registrarreview', component: Crearreviews },
            { path: 'ediciones/:id', component: Crearreviews }
        ],
        canActivate: [segGuard]
    },
    {
        path: 'roles',
        component: Roles,
        children: [
            { path: 'registraroles', component: Crearroles },
            { path: 'ediciones/:id', component: Crearroles }
        ],
        canActivate: [segGuard]
    },
    {
        path: 'rooms',
        component: Rooms,
        children: [
            { path: 'registrarooms', component: Crearrooms },
            { path: 'ediciones/:id', component: Crearrooms }
        ],
        canActivate: [segGuard]
    },
    {
        path: 'tickets',
        component: Tickets ,
        children: [
            { path: 'registrartickets', component: CrearTicketComponent },
            { path: 'ediciones/:id', component: CrearTicketComponent }
        ],
        
    },
    {
        path: 'typepayment',
        component: Typepayments,
        children: [
            { path: 'registrartype', component: Creartypepayments },
            { path: 'ediciones/:id', component: Creartypepayments }
        ],
        canActivate: [segGuard]
    },
    {
        path: 'reportes',
        component: Reportes,
        children:[
          { path: 'find-movie-schedule', component: FindMovieScheduleDTO },
          { path: 'find-tickets-username', component: FindTicketsUsernameDTO },
          { path: 'get-movie-review', component: GetMovieReviewDTO },
          { path: 'quantity-functions-cinema', component: QuantityFunctionsCinemaDTO },
          { path: 'quantity-functions-user-date', component: QuantityFunctionsUserDateDTOComponent },
          { path: 'quantity-functions-users', component: QuantityFunctionsUserDTO },
          { path: 'quantity-movies-city', component: QuantityMoviesCityDTOcomponent },
          { path: 'quantity-tickets-cinema', component: QuantityTicketsCinemaDTOcomponent },
          { path: 'quantity-total-revenue-by-payment', component:QuantityTotalRevenueByPaymentDTOcomponent },
          { path: 'quantity-total-revenue-by-payment-date', component: TotalRevenuewByPaymentDateDTO}
        ]
    },
    {
        path: 'users',component: Users,
        canActivate: [segGuard]
    },
];
