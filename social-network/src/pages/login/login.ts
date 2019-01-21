import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignUpPage } from '../signup/signup';
import * as firebase from 'firebase';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	username = "";
	password = "";
	error: string;
	newUser: boolean;
	users: Object;

	constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public storage: Storage, public toastCtrl: ToastController) {
	}

	onLogin() {
		if (this.username.length != 0 && this.password.length != 0) {
			let loading = this.loadingCtrl.create({
				content: 'Connexion...'
			});
			loading.present();
			let connect: boolean;
			let userId;
			let usersDatabase = firebase.database().ref().child('users');
			this.error = "";
			usersDatabase.once('value').then(
				(data) => {
					this.users = data.val();
					for (let i = 1; i <= parseInt((Object.keys(this.users)[Object.keys(this.users).length-1]).replace(/\D/g, "")); i++) {
						let user = 'user'+i;
						try {
							if (this.username.toLowerCase() == this.users[user].username &&
								this.password == this.users[user].password) {
								connect = true;
								userId = this.users[user].userId;
								break;
							} else {
								connect = false;
							}
						} catch (err) {
						}
					}
					if (connect == true) {
						this.storage.set('userId',userId).then(() => {
							loading.dismiss();
							let toast = this.toastCtrl.create({
								message: 'Connexion réussie.',
								position: 'bottom',
								duration: 2000
							});
							toast.present();
							this.navCtrl.push(HomePage, {username: this.username.toLowerCase()});
						});
					} else {
						loading.dismiss();
						this.error = 'Mauvais nom d\'utilisateur ou mot de passe';
					}
				});
		} else {
			this.error = "Veuillez remplir tous les champs."
		}
}
	onSignUp() {
		this.navCtrl.push(SignUpPage);
	}
}