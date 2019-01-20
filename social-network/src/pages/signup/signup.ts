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
	confirmPassword = "";
	error: string;
	isNew: boolean;
	users: Object;
	//usersDatabase = firebase.database().ref().child('users');

	constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
	}

	onSignUp() {
		if (this.username.length != 0 && this.password.length != 0 && this.confirmPassword.length != 0) {
			if (this.password == this.confirmPassword) {
				let loading = this.loadingCtrl.create({
					content: 'Inscription en cours...'
				});
				loading.present();
				let isNew: boolean;
				let database = firebase.database();
				this.error = "";
				database.ref().child('users/').once('value').then(
					(data) => {
						this.users = data.val();
						for (let i = 1; i <= parseInt((Object.keys(this.users)[Object.keys(this.users).length-1]).replace(/\D/g, "")); i++) {
							let user = 'user'+i;
							try {
								if (this.username.toLowerCase() == this.users[user].username) {
									isNew = false;
									break;
								} else {
									isNew = true;
								}
							} catch (err) {
							}
						}
						if (isNew == true) {
							let userRef = parseInt((Object.keys(this.users)[Object.keys(this.users).length-1]).replace(/\D/g, ""))+1;
							database.ref('users/user'+userRef).set(
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
				this.error = "Les mots de passe ne correspondent pas."
			}
		} else {
			this.error = "Veuillez remplir tous les champs";
		}
	}
}