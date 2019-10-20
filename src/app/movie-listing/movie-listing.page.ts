import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActionSheetController, NavController, LoadingController, Platform } from '@ionic/angular';
import { Global } from 'src/global/global';

@Component({
  selector: 'app-movie-listing',
  templateUrl: './movie-listing.page.html',
  styleUrls: ['./movie-listing.page.scss'],
})
export class MovieListingPage implements OnInit {

  pastMovieListObject : any[] = []
  movieListObject : any[] = []
  tempMovieList : any[] = []
  PastpageNo : number = 1;
  PastPageCount : number;
  searchTerm : any="";
  sortApplied : boolean = false;
  sortFilter : number = 0;
  subscription : any;

  constructor(public http: HttpClient,public actionSheetController : ActionSheetController,public navCtrl : NavController,public platform : Platform,
  public loadingController: LoadingController, public globalData : Global,public ref : ChangeDetectorRef) 
  { 
    this.callMovieListingApi();

    // this.initializeItems();
  }

  ngOnInit() {}

  ionViewDidEnter()
  { 
    this.subscription = this.platform.backButton.subscribe(()=> { navigator['app'].exitApp(); }
     ); 
  } 
  
  ionViewWillLeave()
  { 
    this.subscription.unsubscribe(); 
  }

  async callMovieListingApi()
  {

    const loading = await this.loadingController.create({
      message: 'Please Wait While Movies Appear',
    });
    await loading.present();

    var apiURL = this.globalData.nowPlayingURL + this.globalData.movieDBApiKey + this.globalData.appendPageNo + this.PastpageNo

    this.http.get(apiURL).subscribe(data=>{
    if(data["results"].length > 0)
    {
      if(this.PastpageNo == 1)
      {
        this.pastMovieListObject = data["results"];
      }
      else
      {
        for(let i = 0 ; i < data["results"].length ; i++)
        {
          this.pastMovieListObject.push(data["results"][i])
        }
      }
      this.PastPageCount = data["total_pages"];
      this.movieListObject = this.pastMovieListObject;
      loading.dismiss();
      this.tempMovieList = this.movieListObject;
      //console.log("Details are",data)
      if(this.sortApplied)
      {
        this.sortBy(this.sortFilter);
      }
    }
    else
    {
      this.movieListObject = undefined;
    }
  },(error) => 
  {
    loading.dismiss();
    //console.log("Error.error is",error.error);
  });
  }

  initializeItems()
  {
    this.movieListObject = this.tempMovieList;
  }

  setFilteredItems(event)
  {

    //console.log(event)

    this.initializeItems();

    const term = event.detail.data

    if(term != null)
    {
      this.movieListObject = this.tempMovieList.filter((item) => {
        return item.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      });   
    }
    else
    {
      this.searchTerm = ""
    }
  }

  async sortByClicked()
  {
    const actionSheet = await this.actionSheetController.create({
      header: 'SORT BY',
      buttons: [
        {
          text: 'Movie Name',
          icon: 'arrow-down',
          handler: () => {
            //console.log('Movie Name Ascending');
            this.sortApplied = true;
            this.sortFilter = 1;
            this.sortBy(this.sortFilter); //Ascending Campaign Name
            //console.log(this.movieListObject);
          }
        },
        {
          text: 'Movie Name',
          icon: 'arrow-up',
          handler: () => {
            //console.log('Movie Name Descending');
            this.sortApplied = true;
            this.sortFilter = 2;
            this.sortBy(this.sortFilter); //Descending Campaign Name
            //console.log(this.movieListObject);
          }
        }
      ]
    });
    await actionSheet.present();
  }

  sortBy(sortFilter)
  {
    switch(sortFilter)
    {
      case 1 : this.movieListObject.sort((a,b)=>a.title.localeCompare(b.title));
                break;
      case 2 : this.movieListObject.sort((a,b)=>b.title.localeCompare(a.title));
                break;
    }
  }

  doInfinite(infiniteScroll) 
  {   
      if(this.PastpageNo < this.PastPageCount)
      {
        this.PastpageNo++;
        setTimeout(() => {       
          this.callMovieListingApi();
          infiniteScroll.target.complete();
        }, 500);
      }
      else
      {
        infiniteScroll.target.complete();
      }
  }

  openMovieDetailsPage(movieid)
  {
    this.navCtrl.navigateForward(['/movie-details',{ movieid : movieid }]);
  }

  eventHandler(keycode)
  {
    //console.log("KEY CODE IS",keycode)

    if(keycode == 13)
    {
      this.focusOut();
      this.ref.detectChanges();
    }
  }

  searchBarCancelClicked()
  {
    this.movieListObject = this.pastMovieListObject;
    this.tempMovieList = this.movieListObject;
    this.focusOut();
    this.ref.detectChanges();
  }

  focusOut() 
  {
    let activeElement = <HTMLElement>document.activeElement;
    activeElement && activeElement.blur && activeElement.blur();
  }
}
