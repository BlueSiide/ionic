import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';

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

	constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
		for (let post of this.posts) {
			if (this.postRef == post.postRef) {
				this.postedBy = post.postedBy;
				this.postContent = post.content;
				this.postDate = post.date;
				try {
					this.answersObj = post.answers;
				} catch(err) {}
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
						if (this.answersObj == undefined) {
							firebase.database().ref().child('posts/post'+this.postRef).set(
								{
									"postedBy": this.postedBy,
									"date": this.postDate,
									"postRef": this.postRef,
									"content": this.postContent,
									"answers": {
										"answer1": {
											"postedBy": this.username,
											"content": this.answerContent
										}
									}
								}).then(() => {
									loading.dismiss();
									this.answerContent = "";
								});
						}
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
}