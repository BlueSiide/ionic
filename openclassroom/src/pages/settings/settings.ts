import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

@Component({
	selector: 'page-settings',
	templateUrl: 'settings.html',
})
export class SettingsPage {

	constructor(private alertCtrl: AlertController) {
	}

	onToggleLights() {
		let alert = this.alertCtrl.create({
			title: 'Êtes-vous certain de vouloir continuer ?',
			subTitle: 'Cette action éteindra toutes les lumières de la maison.',
			buttons: [
				{
					text: 'Annuler'
				},
				{
					text: 'Confirmer',
					handler: () => console.log('Confirmé')
				}
			]
		})
		alert.present();
	}

}