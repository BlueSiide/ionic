import { Appareil } from '../models/appareil';


export class AppareilsService {

	appareilsList: Appareil[] = [
		{
			name: 'Machine à laver',
			description: [
				'Volume: 6 litres',
				'Temps de lavage: 2 heures',
				'Consommation: 173kWh/an'
			],
			isOn: true
		},
		{
			name: 'Télévision',
			description: [
				'Dimensions: 40 pouces',
				'Consommation: 22kWh/an'
			],
			isOn: true
		},
		{
			name: 'Ordinateur',
			description: [
				'Processeur: Intel i9',
				'Carte graphique: Nvidia Gefore GTX 2080',
				'Consommation: 500kWh/an'
			],
			isOn: false
		}
	];

}