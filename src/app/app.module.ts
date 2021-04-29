import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { LocaldatePipe } from './pipes/localdate.pipe';
import { MainComponent } from './components/main/main.component';
import { StationlistComponent } from './components/stationlist/stationlist.component';
import { TaglistComponent } from './components/taglist/taglist.component';
import { FaqComponent } from './components/faq/faq.component';
import { UsersComponent } from './components/users/users.component';
import { OwnersComponent } from './components/owners/owners.component';
import { TopclickComponent } from './components/topclick/topclick.component';
import { TopvoteComponent } from './components/topvote/topvote.component';
import { LastclickComponent } from './components/lastclick/lastclick.component';
import { LastchangeComponent } from './components/lastchange/lastchange.component';
import { GeomapComponent } from './components/geomap/geomap.component';
import { PlayerComponent } from './components/player/player.component';
import { DetailsComponent } from './components/details/details.component';
import { SearchComponent } from './components/search/search.component';
import { NewstationComponent } from './components/newstation/newstation.component';
import { FormsModule } from '@angular/forms';
import { CodeclistComponent } from './components/codeclist/codeclist.component';
import { CountrylistComponent } from './components/countrylist/countrylist.component';
import { LanguagelistComponent } from './components/languagelist/languagelist.component';
import { LinklistComponent } from './components/linklist/linklist.component';

@NgModule({
  declarations: [
    AppComponent,
    LocaldatePipe,
    MainComponent,
    StationlistComponent,
    TaglistComponent,
    FaqComponent,
    UsersComponent,
    OwnersComponent,
    TopclickComponent,
    TopvoteComponent,
    LastclickComponent,
    LastchangeComponent,
    GeomapComponent,
    PlayerComponent,
    DetailsComponent,
    SearchComponent,
    NewstationComponent,
    CodeclistComponent,
    CountrylistComponent,
    LanguagelistComponent,
    LinklistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
