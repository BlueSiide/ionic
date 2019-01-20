import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AccountPage } from '../account/account';
import { NewPostPage } from '../newpost/newpost';

@Component({
	selector: 'page-contact',
	templateUrl: 'contact.html',
})
export class ContactPage {

	constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
	}

	public onToggleMenu() {
		this.menuCtrl.open();
	}

}