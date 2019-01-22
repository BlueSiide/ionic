import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { VisitProfilePage } from '../visitprofile/visitprofile';
import { HomePage } from '../home/home';

@Component({
	selector: 'page-viewpost',
	templateUrl: 'viewpost.html',
})
export class ViewPostPage {

	postedBy: string;
	postContent: string;
	postDate: string;
	answersObj: Object;
	answers = [];
	answerContent: string;
	username = this.navParams.get('username');
	postRef = this.navParams.get('postRef');
	posts = this.navParams.get('posts');
	postsObj: Object;
	users = this.navParams.get('users');

	constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
		for (let post of this.posts) {
			if (this.postRef == post.postRef) {
				this.postedBy = post.postedBy;
				this.postContent = post.content;
				this.postDate = post.date;
				this.refreshAnswers();
				break;
			}
		}
	}

	onPostAnswer() {
		if (this.answerContent.length != 0) {
			let loading = this.loadingCtrl.create({
				content: 'Publication...'
			});
			loading.present();
			firebase.database().ref().child('posts/').orderByChild('postRef').once('value').then(
				(data) => {
					this.postsObj = data.val();
					let database = firebase.database();
					let dateObj = new Date();
					let postDate = dateObj.getDate()+'/'+(dateObj.getMonth()+1)+'/'+dateObj.getFullYear()+' '+dateObj.getHours()+':'+dateObj.getMinutes();
					try {
						this.answersObj = this.postsObj['post'+this.postRef]['answers'];
						let answersObjKeysStr = Object.keys(this.answersObj);
						let answersObjKeysNum = [];
						for (let i = 0; i < answersObjKeysStr.length; i++) {
							answersObjKeysNum[i] = parseInt(answersObjKeysStr[i].replace( /^\D+/g, ''));
						}
						answersObjKeysNum = answersObjKeysNum.sort((a, b) => a - b);
						for (let i = 0; i < answersObjKeysNum.length; i++) {
							let ans = 'answer'+answersObjKeysNum[i];
							this.answers.push(this.answersObj[ans]);
						}
						let ansRef = this.answers[this.answers.length-1].ansRef;
						ansRef++;
						database.ref().child('posts/post'+this.postRef+'/answers/answer'+ansRef).set(
							{
								"postedBy": this.username,
								"content": this.answerContent,
								"date": postDate,
								"ansRef": ansRef
							}).then(() => {
								loading.dismiss();
								this.refreshAnswers();
								this.answerContent = "";
							})	;
					} catch(err) {
						firebase.database().ref().child('posts/post'+this.postRef).set(
							{
								"postedBy": this.postedBy,
								"date": this.postDate,
								"postRef": this.postRef,
								"content": this.postContent,
								"answers": {
									"answer1": {
										"postedBy": this.username,
										"content": this.answerContent,
										"date": postDate,
										"ansRef": 1
									}
								}
							}).then(() => {
								loading.dismiss();
								this.refreshAnswers();
								this.answerContent = "";
							});
					}
			});
		} else {
			let toast = this.toastCtrl.create({
				message: 'Votre réponse est vide.',
				position: 'bottom',
				duration: 3000
			});
			toast.present();
		}
	}

	refreshAnswers() {
		this.answers = [];
		let loading = this.loadingCtrl.create({
			content: 'Chargement...'
		});
		loading.present();
		firebase.database().ref().child('posts/').orderByChild('postRef').once('value').then(
			(data) => {
				this.postsObj = data.val();
				this.answersObj = this.postsObj['post'+this.postRef]['answers'];
				if (this.answersObj != undefined) {
					let database = firebase.database();
					let dateObj = new Date();
					let postDate = dateObj.getDate()+'/'+(dateObj.getMonth()+1)+'/'+dateObj.getFullYear()+' '+dateObj.getHours()+':'+dateObj.getMinutes();
					let answersObjKeysStr = Object.keys(this.answersObj);
					let answersObjKeysNum = [];
					for (let i = 0; i < answersObjKeysStr.length; i++) {
						answersObjKeysNum[i] = parseInt(answersObjKeysStr[i].replace( /^\D+/g, ''));
						answersObjKeysNum = answersObjKeysNum.sort((a, b) => a - b);
					}
					for (let i = 0; i < answersObjKeysNum.length; i++) {
						let ans = 'answer'+answersObjKeysNum[i];
						this.answers.push(this.answersObj[ans]);
					}
					this.answers = this.answers.reverse();
				} else {
					this.answers = [];
				}
				loading.dismiss();
			});
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

	onDeletePost(postRef) {
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
								loading.dismiss();
								let toast = this.toastCtrl.create({
									message: 'Publication supprimée.',
									position: 'bottom',
									duration: 2000
								});
								toast.present();
								this.navCtrl.push(HomePage);
							});
					}
				}
			]
		});
		alert.present();
	}
	
	onDeleteAnswer(postRef, ansRef) {
		let alert = this.alertCtrl.create({
			title: 'Supprimer',
			message: 'Êtes-vous sûr de supprimer cette réponse ?',
			buttons: [
				{
					text: 'Annuler'
				},
				{
					text: 'Confirmer',
					handler: () => {
						let loading = this.loadingCtrl.create({
							content: 'Suppression de la réponse...'
						});
						loading.present();
						firebase.database().ref().child('posts/post'+postRef+'/answers/answer'+ansRef).remove().then(() => {
								loading.dismiss();
								let toast = this.toastCtrl.create({
									message: 'Réponse supprimée.',
									position: 'bottom',
									duration: 2000
								});
								toast.present();
								this.refreshAnswers();
							});
					}
				}
			]
		});
		alert.present();
	}
}