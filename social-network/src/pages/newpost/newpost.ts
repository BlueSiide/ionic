import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, MenuController, LoadingController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ContactPage } from '../contact/contact';
import { AccountPage } from '../account/account';
import * as firebase from 'firebase';

@Component({
	selector: 'page-newpost',
	templateUrl: 'newpost.html',
})
export class NewPostPage {

	newPostContent: string;
	username: string;
	postsObj: Object;
	usersObj: Object;
	users = []; 

	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				public loadingCtrl: LoadingController,
				public menuCtrl: MenuController,
				public toastCtrl: ToastController,
				public storage: Storage) {
		let loading = this.loadingCtrl.create({
			content: 'Chargement...'
		});
		loading.present();
		firebase.database().ref().child('posts/').once('value').then((data) => {
			this.postsObj = data.val();
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
		})

	}

	public onToggleMenu() {
		this.menuCtrl.open();
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
						this.navCtrl.push(HomePage);
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
}