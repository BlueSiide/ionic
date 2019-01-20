import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ContactPage } from '../contact/contact';
import { NewPostPage } from '../newpost/newpost';
import * as firebase from 'firebase';

@Component({
	selector: 'page-account',
	templateUrl: 'account.html',
})
export class AccountPage {

	description: string;
	username: string;
	users = [];
	usersObj: Object;

	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				public menuCtrl: MenuController,
				public loadingCtrl: LoadingController,
				public storage: Storage) {
		this.getUsers();
	}

	public onToggleMenu() {
		this.menuCtrl.open();
	}

	getUsers() {
		let loading = this.loadingCtrl.create({
			content: 'Chargement...'
		});
		loading.present();
		this.users = [];
		firebase.database().ref().child('users/').once('value').then(
			(data) => {
				this.usersObj = data.val();
				for (let i = 0; i < Object.keys(this.usersObj).length; i++) {
					let user = Object.keys(this.usersObj)[i];
					this.users.push(this.usersObj[user]);
				}
				this.storage.get('userId').then((val) => {
					this.username = this.users[val-1].username;
					this.description = this.users[val-1].description;
					loading.dismiss();
				});
		});
	}

}
