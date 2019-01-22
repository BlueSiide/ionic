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
	usersObj: Object;
	users = [];

	constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public storage: Storage, public toastCtrl: ToastController) {
		this.getUsers();
		this.storage.get('username').then((val) => {
			if (val != undefined) {
				this.username = val;
			}
		})
	}

	onLogin() {
		if (this.username.length != 0 && this.password.length != 0) {
			let loading = this.loadingCtrl.create({
				content: 'Connexion...'
			});
			loading.present();
			let userId: number;
			let connect: boolean;
			this.error = "";
			for (let user of this.users) {
				if (user.username == this.username && user.password == this.password) {
					connect = true;
					userId = user.userId;
					break;
				} else {
					connect = false;
				}
			}
			if (connect == true) {
				this.storage.set('username', this.username);
				this.storage.set('userId', userId).then(() => {
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
		} else {
			this.error = "Veuillez remplir tous les champs."
		}
	}
	
	onSignUp() {
		this.navCtrl.push(SignUpPage);
	}



	getUsers() {
		let loading = this.loadingCtrl.create({
			content: 'Chargement...'
		});
		loading.present();
		this.users = [];
		firebase.database().ref().child('users/').orderByChild('postRef').once('value').then(
			(data) => {
				this.usersObj = data.val();
				let usersObjKeysStr = Object.keys(this.usersObj);
				let usersObjKeysNum = [];
				for (let i = 0; i < usersObjKeysStr.length; i++) {
					usersObjKeysNum[i] = parseInt(usersObjKeysStr[i].replace( /^\D+/g, ''));
				}
				usersObjKeysNum = usersObjKeysNum.sort((a, b) => a - b);
				for (let i = 0; i < usersObjKeysNum.length; i++) {
					let user = 'user'+usersObjKeysNum[i];
					this.users.push(this.usersObj[user]);
				}
				loading.dismiss();
		});
	}
}