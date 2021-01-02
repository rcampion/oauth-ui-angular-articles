import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ArticleListConfig, TagsService } from '../core';
import { UsersService } from '../core/services/users.service';
import { DataSharingService } from '../core/services/datasharing.service';

@Component({
	selector: 'app-home-page',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(
		private router: Router,
		private tagsService: TagsService,
		private userService: UsersService,
		private dataSharingService: DataSharingService
	)  {

		this.userService = userService;

		// Subscribe here, this will automatically update 
		// "isUserLoggedIn" whenever a change to the subject is made.
		this.dataSharingService.isUserLoggedIn.subscribe(value => {
			this.isUserLoggedIn = value;
		});
	}

	isUserLoggedIn: boolean;
	listConfig: ArticleListConfig = {
		type: 'all',
		filters: {}
	};
	tags: Array<string> = [];
	tagsLoaded = false;

	ngOnInit() {

		if (this.userService.isUserAuthenticated()) {

			this.setListTo('all');
		}
		else {

			this.setListTo('all');
		}

		this.tagsService.getAll()
			.subscribe(tags => {
				this.tags = tags;
				this.tagsLoaded = true;
			});
	}

	setListTo(type: string = '', filters: Object = {}) {
		// If feed is requested but user is not authenticated, redirect to home
		if (type === 'feed' && !this.userService.isUserAuthenticated()) {
			this.router.navigateByUrl('/home');
			return;
		}

		// Otherwise, set the list object
		this.listConfig = { type: type, filters: filters };
	}

}
