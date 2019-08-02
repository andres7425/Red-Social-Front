import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { GLOBAL } from 'src/app/services/global';
import { Publication } from './../../models/publication';
import { PublicationService } from './../../services/publicatin.service';


@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.componet.html',
    providers: [UserService, PublicationService]
})
export class SidebarComponent implements OnInit{
    public identity;
    public token;
    public stats;
    public url;
    public status;
    public publication: Publication;

    constructor(
        private _userSerive: UserService,
        private _publicationService: PublicationService
    ){
        this.identity = this._userSerive.getIdentity();
        this.token = this._userSerive.getToken();
        this.stats =this._userSerive.getStats();
        this.url = GLOBAL.url;
        this.publication = new Publication("","","","", this.identity._id);
    }

    ngOnInit(){
        console.log("sidebar ha sido cargado"); 
    }

    onSubmit(form){
        this._publicationService.addPublication(this.token, this.publication).subscribe(
            response => {
                if(response.publication){
                   // this.publication = response.publication;
                    this.status = 'success';
                    form.reset();
                }else{
                    this.status = 'error';
                }
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
                if(errorMessage != null){
                    this.status = 'error';
                }
                
            }
        )
        
    }
}