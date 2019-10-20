import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoadingController, ModalController, ToastController, NavController } from '@ionic/angular';
import { Global } from 'src/global/global';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { trigger,state,style,animate,transition } from '@angular/animations';
import { CastDetailPage } from '../cast-detail/cast-detail.page';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  animations: [
    trigger('fadein', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('900ms ease-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('slidelefttitle', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(150%)' }),
        animate('900ms 300ms ease-out', style({ transform: 'translateX(0%)', opacity: 1 }, ))
      ])
    ])
  ]
})
export class MovieDetailsPage implements OnInit {

  movieID : any;
  movieDetail : any;
  loading : any;
  loading1 : any;
  convertedToDecimalHour : any;
  convertedGenreList : any;
  convertedCastList : any;
  movieCastDetail : any;

  constructor(public loadingController: LoadingController,public globalData : Global,public navCtrl: NavController,public ref : ChangeDetectorRef,
  public activatedRoute : ActivatedRoute,public http: HttpClient,public modalController: ModalController,public toast : ToastController) {  }

  ngOnInit() 
  {
    this.movieDetail = new Object();

    this.activatedRoute.paramMap.subscribe((res => {
      this.movieID = res.get('movieid')
    }));

    this.callMovieDetailsApi()
  }

  async callMovieDetailsApi()
  {

    this.loading = await this.loadingController.create({
      message: 'Please Wait While Movies Details Appear',
    });
    await this.loading.present();

    var apiURL = this.globalData.movieDBMovieDetails + this.movieID + this.globalData.appendApiKey + this.globalData.movieDBApiKey

    this.http.get(apiURL).subscribe(data=>{
      //console.log("MOVIE DETAILS DATA IS",data)
      this.movieDetail = data
      this.convertToDecimalHours(this.movieDetail.runtime)
      this.convertToCommaSeperatedGenreString(this.movieDetail.genres)
      this.getCastDetails()
      
    }, (error) => 
      {
        this.loading.dismiss();
        //console.log("Error.error is",error.error);
        //Error Block
    });
  }

  convertToDecimalHours(movieMinutes)
  {
    var convertToHour = movieMinutes / 60;
    var decimalTimeString = convertToHour;
    var decimalTime = parseFloat(decimalTimeString.toFixed(2));
    decimalTime = decimalTime * 60 * 60;
    var hours = Math.floor((decimalTime / (60 * 60)));
    decimalTime = decimalTime - (hours * 60 * 60);
    var minutes = Math.floor((decimalTime / 60));
    decimalTime = decimalTime - (minutes * 60);
    var seconds = Math.round(decimalTime);
    if(hours < 10)
    {
      hours = hours;
    }
    if(minutes < 10)
    {
      minutes = minutes;
    }
    if(seconds < 10)
    {
      seconds = seconds;
    }
    this.convertedToDecimalHour = hours + " hrs " + minutes + " min";
  }

  convertToCommaSeperatedGenreString(genres)
  {
    var genreList = []
    if(genres)
    {
      genres.forEach(element => {
        genreList.push(element.name)
      });
  
      this.convertedGenreList = genreList.join(', ');
    }
  }

  getCastDetails()
  {
    var apiURL = this.globalData.movieDBMovieDetails + this.movieID + this.globalData.appendCredits + this.globalData.appendApiKey + this.globalData.movieDBApiKey

    this.http.get(apiURL).subscribe(data=>{
      if(data["cast"].length > 0)
      {
        this.movieCastDetail = data["cast"];
        this.convertToCommaSeperatedCastString(this.movieCastDetail)
        this.loading.dismiss();
      }
      //console.log("MOVIE CAST DETAILS IS", this.movieCastDetail)
    }, (error) => 
    {
      this.loading.dismiss();
      //console.log("Error.error is",error.error);
      //Error Block
    });
  }

  convertToCommaSeperatedCastString(cast)
  {
    var castList : any = [];
    if(cast)
    {
      cast.forEach(element => {
        castList.push(element.name)
      });
  
      this.convertedCastList = castList.join(', ');
      //this.loader.dismiss()
    }
  }

  async callCastDetails(id) 
  {
    this.loading1 = await this.loadingController.create({
      message: 'Please Wait While Cast Details Appear',
    });
    await this.loading1.present();
    
    var apiURL = this.globalData.castDetails + id + this.globalData.appendApiKey + this.globalData.movieDBApiKey

    this.http.get(apiURL).subscribe(data=>{
      //console.log(data)

      this.openModal(data["biography"])
    });
  }

  async openModal(biography)
  {
    if(biography)
    {
      this.loading1.dismiss();

      const modal = await this.modalController.create({
        component: CastDetailPage,
        componentProps: {
          'biography': biography,
        }
      });
      return await modal.present();
    }
    else
    {
      this.presentToast()
      this.loading1.dismiss();
    }
  }

  async presentToast() 
  {
    const toast = await this.toast.create({
      message: 'No Biography found.',
      cssClass : "toast-mess",
      duration: 2000
    });
    toast.present();
  }

  goBack()
  {
    this.navCtrl.navigateBack('/movie-listing');
  }

}
