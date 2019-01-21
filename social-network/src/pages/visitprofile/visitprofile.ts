import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
	selector: 'page-visitprofile',
	templateUrl: 'visitprofile.html',
})
export class VisitProfilePage {

	username = this.navParams.get('username');
	description = this.navParams.get('description');

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

}