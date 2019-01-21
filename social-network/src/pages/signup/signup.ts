import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';

@Component({
	selector: 'page-signup',
	templateUrl: 'signup.html',
})
export class SignUpPage {

	username = "";
	password = "";
	confirmPassword = "";
	email = "";
	error: string;
	isNew: boolean;
	usersObj: Object;
	users = [];
	
	constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public storage: Storage) {
		this.getUsers();
	}

	getUsers() {
		let loading = this.loadingCtrl.create({
			content: 'Chargement ...'
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
					this.storage.get('userId').then((val) => {
						this.username = this.users[val-1].username;
						loading.dismiss();
					});
				}
		});
	}

	onSignUp() {
		if (this.username.length != 0 && this.password.length != 0 && this.confirmPassword.length != 0 && this.email.length != 0) {
			if (this.password == this.confirmPassword) {
				if (this.username.toLowerCase().replace(" ", "") == this.username.toLowerCase() && this.email.toLowerCase().replace(" ", "") == this.email.toLowerCase()) {
					let loading = this.loadingCtrl.create({
						content: 'Inscription en cours...'
					});
					loading.present();
					let isNew: boolean;
					let database = firebase.database();
					this.error = "";
					for (let user of this.users) {
						if (user.username == this.username) {
							isNew = false;
							break;
						} else {
							isNew = true;
						}
					}
					if (isNew == true) {
						let userRef = (this.users[this.users.length-1].userId)+1;
						database.ref('users/user'+userRef).set(
								{
									"username": this.username.toLowerCase().replace(" ", ""),
									"password": this.password,
									"email": this.email.toLowerCase().replace(" ", ""),
									"userId": userRef
								}
							)
						loading.dismiss();
						this.navCtrl.push(LoginPage);
					} else {
						loading.dismiss();
						this.error = 'Ce nom d\'utilisateur et/ou email existe déjà.';
					}
				} else {
					this.error = "Vous ne pouvez pas utiliser d'espace dans votre nom d'utilisateur."
				}
			} else {
				this.error = "Les mots de passe ne correspondent pas."
			}
		} else {
			this.error = "Veuillez remplir tous les champs";
		}
	}
}