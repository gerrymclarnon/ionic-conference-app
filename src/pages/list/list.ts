import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

// Providers
import { ListService } from '../../providers/list-service';

@Component({
    selector: 'page-list',
    templateUrl: 'list.html',
})
export class ListPage {

    newListItem: FormGroup;
    list: any = [];


    constructor ( public listService: ListService,
                    public formBuilder: FormBuilder ) {

        this.newListItem = this.formBuilder.group({
            title: [ null, Validators.required ]
        });

        this.listService.getList().subscribe( ( data: any ) => {
            this.list = data;
        });
    }

    addListItem () {

        this.listService.addListItem( { title: this.newListItem.value.title } )
            .then( ( result: any ) => this.newListItem.reset() )
            .catch( ( error: any ) => console.error( error ) );
    }

    removeListItem ( listItem: any ) {

        this.listService.removeListItem( listItem )
            .then( ( result: any ) => {})
            .catch( ( error: any ) => console.error( error ) );
    }
}
