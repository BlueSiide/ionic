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

	newPostContent = '';
	username: string;
	userId: number;
	postsObj: Object;
	usersObj: Object;
	users = [];
	posts = [];
	tagsListDisplay = false;

	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				public loadingCtrl: LoadingController,
				public menuCtrl: MenuController,
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
					this.userId = val;
					this.username = this.users[this.userId-1].username;
					loading.dismiss();
				});
		});
	}

	onNewPost() {
		if (this.newPostContent.length != 0) {
			let loading = this.loadingCtrl.create({
				content: 'Publication...'
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
						let database = firebase.database();
						let dateObj = new Date();
						let postDate = dateObj.getDate()+'/'+(dateObj.getMonth()+1)+'/'+dateObj.getFullYear()+' '+dateObj.getHours()+':'+dateObj.getMinutes();
						let postRef = this.posts[this.posts.length-1].postRef;
						postRef++;
						database.ref().child('posts/post'+postRef).set(
							{
								"postRef": postRef,
								"postedBy": this.username,
								"content": this.newPostContent,
								"date": postDate,
							}
						).then(() => {
							loading.dismiss();
							this.newPostContent = "";
							this.navCtrl.push(HomePage);
						});
			});
		} else {
			let toast = this.toastCtrl.create({
				message: 'Votre publication est vide.',
				position: 'bottom',
				duration: 3000
			});
			toast.present();
		}
	}

	onToggleTagsList() {
		if (this.tagsListDisplay == true) {
			this.tagsListDisplay = false;
		} else {
			this.tagsListDisplay = true;
		}
	}
}