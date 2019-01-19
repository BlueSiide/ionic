import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})

export class HomePage {

	constructor(public navCtrl: NavController, public menuCtrl: MenuController) {

	}

	posts = [
		{
			title: 'Post one',
			date: new Date(),
			content: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. '
		},
		{
			title: 'Post two',
			date: new Date(),
			content: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. '
		},
		{
			title: 'Post three',
			date: new Date(),
			content: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. '
		},
		{
			title: 'Post four',
			date: new Date(),
			content: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. '
		},
		{
			title: 'Post five',
			date: new Date(),
			content: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. '
		}
	]

}