import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, MenuController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { UsersPage } from '../users/users';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	version = '1.0.1';
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
					console.log(this.username);
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

	onNewPost() {
		if (this.newPostContent.length != 0) {
			let loading = this.loadingCtrl.create({
				content: 'Publication...'
			});
			loading.present();
			let database = firebase.database();
			let dateObj = new Date();
			let postDate = dateObj.getDate()+'/'+(dateObj.getMonth()+1)+'/'+dateObj.getFullYear()+' '+dateObj.getHours()+':'+dateObj.getMinutes();
					let postRef = parseInt((Object.keys(this.postsObj)[Object.keys(this.postsObj).length-1]).replace(/\D/g, ""))+1;
					database.ref().child('posts/post'+postRef).set(
						{
							"postRef": postRef,
							"postedBy": this.username,
							"content": this.newPostContent.replace("\n", "<br>"),
							"date": postDate
						}
					).then(() => {
						loading.dismiss();
						this.newPostContent = "";
						this.onRefresh();
					});
		} else {
			let toast = this.toastCtrl.create({
				message: 'Votre publication est vide',
				position: 'bottom',
				duration: 3000
			});
			toast.present();
		}
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
}