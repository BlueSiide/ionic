import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, ToastController, AlertController } from 'ionic-angular';
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

	constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
		this.onRefresh();
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
			let database = firebase.database();
			let dateObj = new Date();
			let postDate = dateObj.getDate()+'/'+(dateObj.getMonth()+1)+'/'+dateObj.getFullYear()+' '+dateObj.getHours()+':'+dateObj.getMinutes();
					let postRef = parseInt((Object.keys(this.postsObj)[Object.keys(this.postsObj).length-1]).replace(/\D/g, ""))+1;
					database.ref().child('posts/post'+postRef).set(
						{
							"postRef": postRef,
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

	onDisconnect() {
		let loading = this.loadingCtrl.create({
			content: 'Déconnexion...'
		});
		loading.present();
		location.reload();
	}
}