import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

// Providers
import { ObjectService } from '../../providers/object-service';

@Component({
    selector: 'page-object',
    templateUrl: 'object.html',
})
export class ObjectPage {

    newObject: FormGroup;
    object: any = {};

    constructor( public formBuilder: FormBuilder,
                    public objectService: ObjectService ) {

        this.newObject = this.formBuilder.group({
            title: [ null ],
            location: [ null ],
            sendInvites: [ true ]
        });

        this.objectService.getObject().subscribe( ( data: any ) => {
            this.object = data;
        })
    }

    setEvent () : Promise<any> {

        let objectToSet = {
            title: this.newObject.value.title,
            location: this.newObject.value.location,
            sendInvites: this.newObject.value.sendInvites,
        }

        return this.objectService.setObject( objectToSet )
            .then( ( ) => this.newObject.reset() )
            .catch( ( error: any ) => console.error( error ) );
    }
}
