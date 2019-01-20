import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	username = this.navParams.get('username');
	postedBy: string;
	content: string;
	date: Date;
	newPostContent = '';
	postsObj: Object;
	posts = [];

	constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
		this.onRefresh();
	}

	Post(username, content, date) {
		this.postedBy = username;
		this.content = content;
		this.date = date;
	}

	onRefresh() {
		this.posts = [];
		let postsCount = 0;
		firebase.database().ref().child('posts/').once('value').then(
			(data) => {
				this.postsObj = data.val();
				for (var postCnt in this.postsObj) {
					postsCount++;
				}
				for (let i = 1; i <= postsCount; i++) {
					let post = 'post'+i;
					this.posts.push(this.postsObj[post]);
				}
				this.posts = this.posts.reverse();
		});
	}

	onNewPost() {
		if (this.newPostContent.length != 0) {
			let database = firebase.database();
			let postsCount = 0;
			let dateObj = new Date();
			let postDate = dateObj.getDate()+'/'+(dateObj.getMonth()+1)+'/'+dateObj.getFullYear()+' '+dateObj.getHours()+':'+dateObj.getMinutes();
					for (var post in this.posts) {
						postsCount++;
					}
					database.ref().child('posts/post'+(postsCount+1)).set(
						{
							"postedBy": this.username,
							"content": this.newPostContent,
							"date": postDate
						}
					).then(() => {
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

	onDisconnect() {
		let loading = this.loadingCtrl.create({
			content: 'Déconnexion...'
		});
		loading.present();
		location.reload();
	}
}