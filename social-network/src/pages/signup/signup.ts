import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import * as firebase from 'firebase';

@Component({
	selector: 'page-signup',
	templateUrl: 'signup.html',
})
export class SignUpPage {

	username: string;
	password: string;
	error: string;
	isNew: boolean;
	users = this.navParams.get('users');
	//usersDatabase = firebase.database().ref().child('users');

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	onSignUp() {
		this.error = "";
		if (this.username != undefined && this.password != undefined) {
			for (var i = 0; i < this.users.length; i++) {
				if (this.username == this.users[i].username) {
					this.isNew = false;
					break;
				} else {
					this.isNew = true;
				}
			}
			if (this.isNew == true) {
				this.navCtrl.push(LoginPage, {username: this.username, password: this.password});
			} else {
				this.error = "Ce nom d'utilisateur existe déjà.";
			}
		} else {
			this.error = 'Veuillez remplir tous les champs';
		}
	}
}
