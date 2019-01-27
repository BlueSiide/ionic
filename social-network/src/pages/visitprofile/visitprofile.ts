import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { ViewPostPage } from '../viewpost/viewpost';
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
	followers = [];
	posts = [];
	postsObj: Object;
	userPosts = [];
	followerListDisplay = false;
	subsNbr: number;

	constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public alertCtrl: AlertController) {
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
		this.followers = this.usersObj['user'+this.profileUserId].followers;
		this.subsNbr = this.usersObj['user'+this.profileUserId].followers.length;
		this.getPosts();
	}

	getPosts() {
		let loading = this.loadingCtrl.create({
			content: 'Chargement...'
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
				for (let post of this.posts) {
					if (post.postedBy == this.profileUsername) {
						this.userPosts.push(post);
					}
				}
				loading.dismiss();
			});
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
								this.getPosts();
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