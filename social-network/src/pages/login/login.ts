import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignUpPage } from '../signup/signup';
import * as firebase from 'firebase';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	User(username, password) {
		this.username = username;
		this.password = password;
	}

	username: string /*= this.navParams.get('username')*/;
	password: string /*= this.navParams.get('password')*/;
	error: string;
	connect: boolean;
	newUser: boolean;
	users: Object;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		/*if (this.navParams.get('username') != undefined) {
			this.users.push(new this.User(this.navParams.get('username'), this.navParams.get('password')));
		}
		this.username = '';
		this.password = '';*/
	}


	/*users = [
		{
			username: 'admin',
			password: 'admin'
		},
		{
			username: 'user1',
			password: 'password1'
		},
		{
			username: 'user2',
			password: 'password2'
		},
		{
			username: 'user3',
			password: 'password3'
		},
		{
			username: 'user4',
			password: 'password4'
		}
	]*/

	onLogin() {
		let userCount;
		let usersDatabase = firebase.database().ref().child('users');
		this.error = "";
		usersDatabase.once('value').then(
			(data) => {
				this.users = data.val();
					console.log(Object.values(this.users)[0]);
				for (var user in this.users) {
					userCount++;
				}
				for (userCount; userCount > 0; userCount--) {
					let 
				}
			});
		

		/*for (var i = 0; i < this.users.length; i++) {
			if (this.username == this.users[i].username && this.password == this.users[i].password) {
				this.connect = true;
				break;
			} else {
				this.connect = false;
			}
		}
		if (this.connect == true) {
			this.navCtrl.push(HomePage, {username: this.username});
		} else {
			this.error = "Mauvais nom d'utilisateur ou mot de passe.";
		}*/
	}

	onSignUp() {
		this.navCtrl.push(SignUpPage, {users: this.users});
	}
}