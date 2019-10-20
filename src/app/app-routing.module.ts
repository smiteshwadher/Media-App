import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'movie-listing', pathMatch: 'full' },
  { path: 'movie-listing', loadChildren: './movie-listing/movie-listing.module#MovieListingPageModule' },
  { path: 'movie-details', loadChildren: './movie-details/movie-details.module#MovieDetailsPageModule' },
  { path: 'cast-detail', loadChildren: './cast-detail/cast-detail.module#CastDetailPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
