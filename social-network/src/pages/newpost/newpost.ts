import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ContactPage } from '../contact/contact';
import { AccountPage } from '../account/account';

@Component({
	selector: 'page-newpost',
	templateUrl: 'newpost.html',
})
export class NewPostPage {

	constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
	}

	public onToggleMenu() {
		this.menuCtrl.open();
	}
}
