import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { VisitProfilePage } from '../visitprofile/visitprofile';
import * as firebase from 'firebase';

@Component({
	selector: 'page-searchuser',
	templateUrl: 'searchuser.html',
})
export class SearchUserPage {

	usersFound = [];
	users = [];
	usersObj: Object;
	username: string;
	userSearched = "";
	notFound = false;

	constructor(public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, public menuCtrl: MenuController, public storage: Storage, public loadingCtrl: LoadingController) {
		this.getUsers();
	}

	public onToggleMenu() {
		this.menuCtrl.open();
	}

	onVisitProfile(username) {
		let userFound = false;
		for (let user in this.users) {
			if (username == this.users[user].username) {
				userFound = true;
				this.navCtrl.push(VisitProfilePage, {"profileUserId": this.users[user].userId, "usersObj": this.usersObj, "users": this.users, "username": this.username});
				break;
			}
		}
		if (userFound == false) {
			let toast = this.toastCtrl.create({
				duration: 2000,
				message: 'Cet utilisateur n\'existe plus.'
			});
			toast.present();
		}
	}

	onSearchUser() {
		if (this.userSearched.replace(" ","").length != 0) {
			let loading = this.loadingCtrl.create({
				content: 'Recherche...'
			});
			loading.present();
			this.usersFound = [];
			for (let user of this.users) {
				if (user.username.includes(this.userSearched.replace(" ",""))) {
					this.usersFound.push(user);
				}
			}
			if (this.usersFound[0] == undefined) {
				this.notFound = true;
			} else {
				this.notFound = false;
			}
			loading.dismiss();
		} else {
			let toast = this.toastCtrl.create({
				message: 'Votre recherche est vide.',
				duration: 2000
			});
			toast.present();
		}
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
					for (let user of this.users) {
						if (val == user.userId) {
							this.username = user.username;
							break;
						}
					}
					loading.dismiss();
				});
		});
	}
}