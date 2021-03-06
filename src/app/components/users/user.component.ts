import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from './../../services/user.service';
import { GLOBAL } from 'src/app/services/global';
import { FollowService } from './../../services/follow.services';
import { Follow } from 'src/app/models/follow';


@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    providers: [UserService, FollowService]
})

export class UserComponent implements OnInit {
    public title: string;
    public identity;
    public url;
    public token;
    public page;
    public next_page;
    public prev_page;
    public total;
    public pages;
    public users: User[]
    public follows;
    public status: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _followService: FollowService
    ) {
        this.title = 'Gente';
        this.url = GLOBAL.url;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }

    ngOnInit() {
        console.log('Users.component ha sido cargado');
        this.actualPage();
    }

    actualPage() {
        this._route.params.subscribe(params => {
            let page = + params['page'];
            this.page = page;

            if (!params['page']) {
                page = 1;
            }

            if (!page) {
                page = 1;
            } else {
                this.next_page = page + 1;
                this.prev_page = page - 1;

                if (this.prev_page <= 0) {
                    this.prev_page = 1;
                }
            }
            // Devolver listado de usuarios
            this.getUsers(page);
        });
    }

    getUsers(page) {
        this._userService.getUsers(page).subscribe(
            response => {
                if (!response.users) {
                    this.status = 'error';

                } else {
                    this.total = response.total;
                    this.users = response.users;
                    this.pages = response.pages;
                    this.follows = response.user_following

                    if (page < this.pages) {
                        this._router.navigate(['/gente', 1]);
                    }
                }
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);

                if (errorMessage != null) {
                    this.status = 'error';
                }

            }
        )
    }

    public followUserOver;
    mousenEnter(user_id) {
        this.followUserOver = user_id;
    }

    mousenLeave(user_id) {
        this.followUserOver = 0;
    }

    followUser(followed) {
        var follow = new Follow('', this.identity._id, followed);

        this._followService.addFollow(this.token, follow).subscribe(
            response => {
                if (!response.follow) {
                    this.status = 'error';
                } else {
                    this.status = 'success';
                    this.follows.push(followed);
                }
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);

                if (errorMessage != null) {
                    this.status = 'error';
                }

            }
        )
    }

    unFollowUser(followed) {
        this._followService.deleteFollow(this.token, followed).subscribe(
            response => {
                var search = this.follows.indexOf(followed);
                if(search != -1){
                    this.follows.splice(search, 1);
                }
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);

                if (errorMessage != null) {
                    this.status = 'error';
                }

            }
        )
    }
}