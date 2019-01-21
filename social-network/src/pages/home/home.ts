import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, MenuController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { UsersPage } from '../users/users';
import { VisitProfilePage } from '../visitprofile/visitprofile';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	version = '1.1';
	username: string;
	postedBy: string;
	content: string;
	date: Date;
	newPostContent = '';
	posts = [];
	postsObj: Object;
	users = [];
	usersObj: Object;

	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				public menuCtrl: MenuController,
				public alertCtrl: AlertController,
				public loadingCtrl: LoadingController,
				public toastCtrl: ToastController,
				public storage: Storage) {
		this.getUser();
		this.onRefresh();
	}

	public onToggleMenu() {
		this.menuCtrl.open();
	}

	getUser() {
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
					loading.dismiss();
				});
		});
	}

	onRefresh() {
		let loading = this.loadingCtrl.create({
			content: 'Chargement des posts...'
		});
		loading.present();
		this.posts = [];
		firebase.database().ref().child('posts/').once('value').then(
			(data) => {
				this.postsObj = data.val();
				for (let i = 0; i < Object.keys(this.postsObj).length; i++) {
					let post = Object.keys(this.postsObj)[i];
					this.posts.push(this.postsObj[post]);
				}
				this.posts = this.posts.reverse();
				loading.dismiss();
		});
	}

	onDelete(postRef) {
		let alert = this.alertCtrl.create({
			title: 'Supprimer',
			message: 'Êtes-vous sûr de supprimer ce post ?',
			buttons: [
				{
					text: 'Annuler'
				},
				{
					text: 'Confirmer',
					handler: () => {
						let loading = this.loadingCtrl.create({
							content: 'Suppression du post...'
						});
						loading.present();
						firebase.database().ref().child('posts/post'+postRef).remove().then(() => {
								this.onRefresh();
								loading.dismiss();
							});
					}
				}
			]
		});
		alert.present();
	}
	
	onShowUsers() {
		this.navCtrl.push(UsersPage);
	}

	onVisitProfile(postedBy) {
		for (let user in this.users) {
			if (postedBy == this.users[user].username) {
				let description: string;
				if (this.users[user].description == undefined) {
					description = "Aucune description.";
				} else {
					description = this.users[user].description;
				}
				this.navCtrl.push(VisitProfilePage, {"username": this.users[user].username, "description": description});
				break;
			}
		}
	}
}