import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import * as firebase from 'firebase';

@Component({
	selector: 'page-signup',
	templateUrl: 'signup.html',
})
export class SignUpPage {

	username = "";
	password = "";
	error: string;
	isNew: boolean;
	users: Object;
	//usersDatabase = firebase.database().ref().child('users');

	constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
	}

	onSignUp() {
		if (this.username.length != 0 && this.password.length != 0) {
			let loading = this.loadingCtrl.create({
				content: 'Inscription en cours...'
			});
			loading.present();
			let isNew: boolean;
			let userCount = 0;
			let database = firebase.database();
			this.error = "";
			database.ref().child('users/').once('value').then(
				(data) => {
					this.users = data.val();
					for (var user in this.users) {
						userCount++;
					}
					for (let i = 1; i <= userCount; i++) {
						let user = 'user'+i;
						if (this.username.toLowerCase() == this.users[user].username) {
							isNew = false;
							break;
						} else {
							isNew = true;
						}
					}
					if (isNew == true) {
						database.ref('users/user'+(userCount+1)).set(
								{
									"username": this.username.toLowerCase(),
									"password": this.password,
								}
							)
						loading.dismiss();
						this.navCtrl.push(LoginPage);
					} else {
						loading.dismiss();
						this.error = 'Ce nom d\'utilisateur existe déjà.';
					}
				});
			} else {
				this.error = "Veuillez remplir tous les champs";
			}
	}
}