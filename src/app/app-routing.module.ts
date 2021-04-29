import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqComponent } from './components/faq/faq.component';
import { GeomapComponent } from './components/geomap/geomap.component';
import { LastchangeComponent } from './components/lastchange/lastchange.component';
import { LastclickComponent } from './components/lastclick/lastclick.component';
import { MainComponent } from './components/main/main.component';
import { OwnersComponent } from './components/owners/owners.component';
import { SearchComponent } from './components/search/search.component';
import { TaglistComponent } from './components/taglist/taglist.component';
import { TopclickComponent } from './components/topclick/topclick.component';
import { TopvoteComponent } from './components/topvote/topvote.component';
import { UsersComponent } from './components/users/users.component';
import { NewstationComponent } from './components/newstation/newstation.component';
import { DetailsComponent } from './components/details/details.component';
import { CodeclistComponent } from './components/codeclist/codeclist.component';
import { CountrylistComponent } from './components/countrylist/countrylist.component';
import { LanguagelistComponent } from './components/languagelist/languagelist.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'users', component: UsersComponent },
  { path: 'owners', component: OwnersComponent },
  { path: 'topclick', component: TopclickComponent },
  { path: 'topvote', component: TopvoteComponent },
  { path: 'lastclick', component: LastclickComponent },
  { path: 'lastchange', component: LastchangeComponent },
  { path: 'tags', component: TaglistComponent },
  { path: 'countries', component: CountrylistComponent },
  { path: 'languages', component: LanguagelistComponent },
  { path: 'codecs', component: CodeclistComponent },
  { path: 'map', component: GeomapComponent },
  { path: 'search', component: SearchComponent },
  { path: 'add', component: NewstationComponent },
  { path: 'history/:id', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
