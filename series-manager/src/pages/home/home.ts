import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	series = [];

	constructor(public navCtrl: NavController, public alertCtrl: AlertController, public storage: Storage) {	
		this.storage.get('series').then((val) => {
			if (val != null) {
				this.series = val;
			}
		});
	}

	onNewSeries() {
		let alert = this.alertCtrl.create({
			title: 'Nouvelle série',
			message: 'Nom de la série :',
			inputs: [{
					name: 'seriesTitle'
				}],
			buttons: [
				{
					text: 'Annuler'
				},
				{
					text: 'Confirmer',
					handler: (data) => {
						let newSeries;
						if (this.series.length >= 1) {
							newSeries = {
								name: data['seriesTitle'],
								season: 1,
								episode: 1,
								id: (this.series[this.series.length-1].id)+1
							}	
						} else {
							newSeries = {
								name: data['seriesTitle'],
								season: 1,
								episode: 1,
								id: 0
							}	
						}
						this.series.push(newSeries);
						this.storage.set('series', this.series);
					}
				}
			]
		});
		alert.present();
	}

	onDeleteSeries(id) {
		for (let i = 0; i <= this.series[this.series.length-1].id; i++) {
			try {
				if (id == this.series[i].id) {
					let alert = this.alertCtrl.create({
						message: 'Êtes-vous sûr de vouloir supprimer '+this.series[i].name+' ?',
						buttons: [
							{
								text: 'Annuler'
							},
							{
								text: 'Confirmer',
								handler: () => {
									this.series.splice(i, 1);
									this.storage.set('series', this.series);
								}
							}
						]
					});
					alert.present();
					break;
				}
			} catch(err){}
		}
	}

	onDownSeason(id) {
		for (let i = 0; i <= this.series[this.series.length-1].id; i++) {
			try {
				if (id == this.series[i].id) {
					if (this.series[i].season > 1) {
						this.series[i].season--;
						this.series[i].episode = 1;
						this.storage.set('series', this.series);
					}
					break;
				}
			} catch(err){}
		}
	}
	onUpSeason(id) {
		for (let i = 0; i <= this.series[this.series.length-1].id; i++) {
			try {
				if (id == this.series[i].id) {
					this.series[i].season++;
					this.series[i].episode = 1;
					this.storage.set('series', this.series);
					break;
				}
			} catch(err){}
		}
	}

	onDownEpisode(id) {
		for (let i = 0; i <= this.series[this.series.length-1].id; i++) {
			try {
				if (id == this.series[i].id) {
					if (this.series[i].episode > 1) {
						this.series[i].episode--;
						this.storage.set('series', this.series);
					}
					break;
				}
			} catch(err){}
		}
	}
	onUpEpisode(id) {
		for (let i = 0; i <= this.series[this.series.length-1].id; i++) {
			try {
				if (id == this.series[i].id) {
					this.series[i].episode++;
					this.storage.set('series', this.series);
					break;
				}
			} catch(err){}
		}
	}

}