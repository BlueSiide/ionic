import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, MenuController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ContactPage } from '../contact/contact';
import { NewPostPage } from '../newpost/newpost';
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

	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				public menuCtrl: MenuController,
				public loadingCtrl: LoadingController,
				public storage: Storage,
				public alertCtrl: AlertController,
				public toastCtrl: ToastController) {
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
					loading.dismiss();
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
}