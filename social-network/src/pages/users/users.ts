import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';

@Component({
	selector: 'page-users',
	templateUrl: 'users.html',
})
export class UsersPage {

	users = [];
	usersObj: Object;

	constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
		this.loadUsers();
	}

	loadUsers() {
		let loading = this.loadingCtrl.create({
			content: 'Chargement des posts...'
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
				loading.dismiss();
		});
	}

	onDeleteUser(userId) {
		let alert = this.alertCtrl.create({
			title: 'Supprimer',
			message: 'Êtes-vous sûr de supprimer cet utilisateur ?',
			buttons: [
				{
					text: 'Annuler'
				},
				{
					text: 'Confirmer',
					handler: () => {
						let loading = this.loadingCtrl.create({
							content: 'Suppression de l\'utilisateur...'
						});
						loading.present();
						firebase.database().ref().child('users/user'+userId).remove().then(() => {
								this.loadUsers();
								loading.dismiss();
							});
					}
				}
			]
		});
		alert.present();
	}

}