import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';

@Component({
	selector: 'page-visitprofile',
	templateUrl: 'visitprofile.html',
})
export class VisitProfilePage {

	profileUserId = this.navParams.get('profileUserId');
	users = this.navParams.get('users');
	usersObj = this.navParams.get('usersObj');
	username = this.navParams.get('username');
	profileUsername: string;
	description: string;
	isFollowing = false;

	constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
		if (this.usersObj['user'+this.profileUserId].description == undefined || this.usersObj['user'+this.profileUserId].description == "") {
			this.description = "Aucune description.";
		} else {
			this.description = this.usersObj['user'+this.profileUserId].description;
		}
		this.profileUsername = this.usersObj['user'+this.profileUserId].username;
		for (let i = 0; i < this.usersObj['user'+this.profileUserId].followers.length; i++) {
			if (this.usersObj['user'+this.profileUserId].followers[i] == this.username) {
				this.isFollowing = true;
				break;
			}
		}
	}

	onFollow() {
		let loading = this.loadingCtrl.create({
			content: 'Chargement...'
		});
		loading.present();
		let userKey;
		this.users = [];
		firebase.database().ref().child('users/').once('value').then(
			(data) => {
			this.usersObj = data.val();
			for (let i = 0; i < Object.keys(this.usersObj).length; i++) {
				let user = Object.keys(this.usersObj)[i];
				this.users.push(this.usersObj[user]);
			}
			for (let i = 1; i <= this.users[this.users.length-1]['userId']; i++) {
				try {
					if (this.usersObj['user'+i]['username'] == this.profileUsername) {
						//this.users[i].s.splice(i, 1);
						userKey = i;
						break;
					}
				} catch(err) {}
			}
			this.usersObj['user'+userKey]['followers'].push(this.username);
			firebase.database().ref('users/user'+userKey).set(
				{
					"username": this.usersObj['user'+userKey].username,
					"password": this.usersObj['user'+userKey].password,
					"email": this.usersObj['user'+userKey].email,
					"userId": this.usersObj['user'+userKey].userId,
					"description": this.usersObj['user'+userKey].description,
					"followers": this.usersObj['user'+userKey]['followers']
				}).then(() => {
					this.isFollowing = true;
					loading.dismiss();
				});
			});
	}

	onUnfollow() {
		let loading = this.loadingCtrl.create({
			content: 'Chargement...'
		});
		loading.present();
		let userKey;
		this.users = [];
		firebase.database().ref().child('users/').once('value').then(
			(data) => {
			this.usersObj = data.val();
			for (let i = 0; i < Object.keys(this.usersObj).length; i++) {
				let user = Object.keys(this.usersObj)[i];
				this.users.push(this.usersObj[user]);
			}
			for (let i = 1; i <= this.users[this.users.length-1]['userId']; i++) {
				try {
					if (this.usersObj['user'+i]['username'] == this.profileUsername) {
						userKey = i;
						for (let i = 0; i < this.users.length; i++) {
							if (this.usersObj['user'+userKey]['followers'][i] == this.username) {
								this.usersObj['user'+userKey].followers.splice(i, 1);
								break;
							}
						}
						break;
					}
				} catch(err) {}
			}
			firebase.database().ref('users/user'+userKey).set(
				{
					"username": this.usersObj['user'+userKey].username,
					"password": this.usersObj['user'+userKey].password,
					"email": this.usersObj['user'+userKey].email,
					"userId": this.usersObj['user'+userKey].userId,
					"description": this.usersObj['user'+userKey].description,
					"followers": this.usersObj['user'+userKey]['followers']
				}).then(() => {
					this.isFollowing = false;
					loading.dismiss();
				});
			});
	}
}