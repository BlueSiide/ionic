import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, MenuController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { UsersPage } from '../users/users';
import { VisitProfilePage } from '../visitprofile/visitprofile';
import { ViewPostPage } from '../viewpost/viewpost';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	version = '1.3';
	serverVersion: string;
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
		this.getUsers();
	}

	public onToggleMenu() {
		this.menuCtrl.open();
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
							this.username = user.username
							break;
						}
					}
					firebase.database().ref().child('version/').once('value').then(
						(data) => {
							this.serverVersion = data.val();
							if (this.serverVersion != this.version) {
								let alert = this.alertCtrl.create({
									message: 'Une nouvelle version est disponible ! Rendez vous à l\'url suivante: bit.ly/zireseau pour la télécharger !',
									title: 'Nouvelle version disponible',
									buttons: [
										{
											text: 'Annuler'
										},
										{
											text: 'Télécharger',
											handler: () => {
												window.open('http://bit.ly/zireseau', '_system');
											}
										}
									]
								});
								alert.present();
							}
						});
					loading.dismiss();
					this.onRefresh();
				});
		});
	}

	onRefresh() {
		let loading = this.loadingCtrl.create({
			content: 'Chargement des publications...'
		});
		loading.present();
		this.posts = [];
		firebase.database().ref().child('posts/').orderByChild('postRef').once('value').then(
			(data) => {
				this.postsObj = data.val();
				let postsObjKeysStr = Object.keys(this.postsObj);
				let postsObjKeysNum = [];
				for (let i = 0; i < postsObjKeysStr.length; i++) {
					postsObjKeysNum[i] = parseInt(postsObjKeysStr[i].replace( /^\D+/g, ''));
				}
				postsObjKeysNum = postsObjKeysNum.sort((a, b) => a - b);
				for (let i = 0; i < postsObjKeysNum.length; i++) {
					let post = 'post'+postsObjKeysNum[i];
					this.posts.push(this.postsObj[post]);
				}
				this.posts = this.posts.reverse();
				loading.dismiss();
		});
	}

	onDelete(postRef) {
		let alert = this.alertCtrl.create({
			title: 'Supprimer',
			message: 'Êtes-vous sûr de supprimer cette publication ?',
			buttons: [
				{
					text: 'Annuler'
				},
				{
					text: 'Confirmer',
					handler: () => {
						let loading = this.loadingCtrl.create({
							content: 'Suppression de la publication...'
						});
						loading.present();
						firebase.database().ref().child('posts/post'+postRef).remove().then(() => {
								this.onRefresh();
								loading.dismiss();
								let toast = this.toastCtrl.create({
									message: 'Publication supprimée.',
									position: 'bottom',
									duration: 2000
								});
								toast.present();
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
		let userFound = false;
		for (let user in this.users) {
			if (postedBy == this.users[user].username) {
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

	onViewPost(postRef) {
		this.navCtrl.push(ViewPostPage, {'postRef': postRef, 'username': this.username, 'posts': this.posts, 'users': this.users});
	}
}