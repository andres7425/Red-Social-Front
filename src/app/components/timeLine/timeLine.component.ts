import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Publication } from './../../models/publication';
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { PublicationService } from './../../services/publicatin.service';
import * as $ from 'jquery'; 


@Component({
    selector: 'timeline',
    templateUrl: './timeLine.component.html',
    providers: [UserService, PublicationService]
})

export class TimeLineComponent implements OnInit {
    public title: string;
    public identity;
    public token;
    public url: string;
    public status: string;
    public page;
    public total;
    public pages;
    public publications: Publication[];
    public itemsPerPage;

    constructor(
        private _rote: ActivatedRoute,
        private _roter: Router,
        private _userService: UserService,
        private _publicationService: PublicationService,
    ) {
        this.title = 'TimeLine';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.page = Number(1);
    }

    ngOnInit() {
        console.log('time line cargado correctamente');
        this.getPublications(this.page);
    }

    getPublications(page, adding = false) {
        this._publicationService.getPublications(this.token, page).subscribe(
            response => {

                if (response.publications) {
                    this.total = response.total_items;
                    this.pages = response.pages;
                    this.itemsPerPage = response.items_per_page;
                    console.log(response);

                    if (!adding) {
                        this.publications = response.publications;
                    } else {
                        var ArrayA = this.publications;
                        var ArrayB = response.publications;
                        this.publications = ArrayA.concat(ArrayB);

                        $("html", "body").animate({ scrollTop: $("body").prop("scrollHeight")}, 500);

                    }
                    if (page > this.pages) {
                        this._roter.navigate(['/home']);
                    }
                }
                else {
                    this.status = 'error';
                }
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
                if (errorMessage != null) {
                    this.status = 'error';
                }
            }

        );
    }
    public noMore = false;
    viewMore() {
        this.page += 1;
        if (this.page == this.pages) {
            this.noMore = true;
        }
        this.getPublications(this.page, true);
    }

}
