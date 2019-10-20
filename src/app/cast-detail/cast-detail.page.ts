import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cast-detail',
  templateUrl: './cast-detail.page.html',
  styleUrls: ['./cast-detail.page.scss'],
})
export class CastDetailPage implements OnInit {

  biography : any;

  constructor(public navParams: NavParams, public modalController : ModalController) 
  { 
    this.biography = navParams.get('biography');
  }

  ngOnInit() {
  }

  async closeModal() 
  {
    await this.modalController.dismiss();
  }

}
