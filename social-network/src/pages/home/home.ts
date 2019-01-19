import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import * as firebase from 'firebase';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	username: string = this.navParams.get('username');
	postedBy: string;
	content: string;
	date: Date;
	newPostContent = '';
	//postsDatabase = firebase.database().ref().child('users');

	constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
	}

	posts = [
		{
			postedBy: 'user1',
			content: 'This social network is pretty awesome dammn.',
			date: new Date()
		}
	]

	Post(username, content, date) {
		this.postedBy = username;
		this.content = content;
		this.date = date;
	}

	onNewPost() {
		if (this.newPostContent.length != 0) {
			this.posts.unshift(new this.Post(this.username, this.newPostContent, new Date()));
			this.newPostContent = '';
		} else {
			alert('Votre publication est vide.');
		}
	}

	onReload() {
		this.navCtrl.push(HomePage, {username: this.username});
	}
}