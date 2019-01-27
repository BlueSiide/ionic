import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, MenuController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { ViewPostPage } from '../viewpost/viewpost';
import { VisitProfilePage } from '../visitprofile/visitprofile'; 
import * as firebase from 'firebase';

@Component({
	selector: 'page-account',
	templateUrl: 'account.html',
})
export class AccountPage {

	users = [];
	usersObj: Object;
	userId: number;
	username: string;
	email: string;
	password: string;
	description: string;
	tagsListDisplay = false;
	followers;
	posts = [];
	postsObj: Object;
	userPosts = [];
	followerListDisplay = false;
	subsNbr: number;

	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				public menuCtrl: MenuController,
				public loadingCtrl: LoadingController,
				public storage: Storage,
				public alertCtrl: AlertController,
				public toastCtrl: ToastController) {
		this.getUsersAndPosts();
	}

	public onToggleMenu() {
		this.menuCtrl.open();
	}

	getUsersAndPosts() {
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
							this.followers = user.followers;
							this.subsNbr = user.followers.length;
							this.userId = val;
							this.username = user.username;
							this.description = user.description;
							this.password = user.password;
							this.email = user.email;
							break;
						}
					}
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
							for (let post of this.posts) {
								if (post.postedBy == this.username) {
									this.userPosts.push(post);
								}
							}
							loading.dismiss();
					});
				});
		});
	}

	onUpdateDesc() {
		let loading = this.loadingCtrl.create({
			content: 'Mise à jour de la description...'
		});
		loading.present();
		firebase.database().ref().child('users/user'+this.userId).set(
					{
							"followers": this.followers,
							"userId": this.userId,
							"username": this.username,
							"password": this.password,
							"email": this.email,
							"description": this.description.replace('\n','<br>')
						}
					).then(() => {
						loading.dismiss();
						let toast = this.toastCtrl.create({
							message: 'Description modifiée.',
							position: 'bottom',
							duration: 3000
						});
						toast.present();
					});
	}

	onDeleteAccount(userId) {
		let alert = this.alertCtrl.create({
			title: 'Supprimer',
			message: 'Êtes-vous sûr de supprimer votre compte ?',
			buttons: [
				{
					text: 'Annuler'
				},
				{
					text: 'Confirmer',
					handler: () => {
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
											this.userId = val;
											this.username = user.username;
											this.description = user.description;
											this.password = user.password;
											this.email = user.email;
											break;
										}
									}
									let loading = this.loadingCtrl.create({
										content: 'Suppression du compte...'
									});
									loading.present();
									for (let i = 0; i < this.users.length; i++) {
										if (this.users[0].followers[i] == this.username) {
											this.users[0].followers.splice(i, 1);
											break;
										}
									}
									firebase.database().ref('users/user1').set(
										{
											"username": this.users[0].username,
											"password": this.users[0].password,
											"email": this.users[0].email,
											"userId": this.users[0].userId,
											"description": this.users[0].description,
											"followers": this.usersObj['user1']['followers']
										}).then(() => {
											firebase.database().ref().child('users/user'+userId).remove().then(() => {
												location.reload();
											});
										});
								});
						})
					}
				}
			]
		});
		alert.present();
	}

	onToggleTagsList() {
		if (this.tagsListDisplay == true) {
			this.tagsListDisplay = false;
		} else {
			this.tagsListDisplay = true;
		}
	}

	onViewPost(postRef) {
		this.navCtrl.push(ViewPostPage, {'postRef': postRef, 'username': this.username, 'posts': this.posts, 'users': this.users, 'usersObj': this.usersObj});
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
								this.getUsersAndPosts();
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

	onToggleFollowersList() {
		if (this.followerListDisplay) {
			this.followerListDisplay = false;
		} else {
			this.followerListDisplay = true;
		}
	}
}