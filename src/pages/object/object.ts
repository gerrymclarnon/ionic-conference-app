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
            boolean: [ false ],
            number: [ null ],
            string: [ null ]
        });

        this.objectService.getObject().subscribe( ( data: any ) => {
            this.object = data;
        })
    }

    setObject () : Promise<any> {

        let objectToSet = {
            boolean: this.newObject.value.boolean,
            number: this.newObject.value.number ? parseInt( this.newObject.value.number ) : null,
            string: this.newObject.value.string
        }

        return this.objectService.setObject( objectToSet )
            .then( ( result: any ) => this.newObject.reset() )
            .catch( ( error: any ) => console.error( error ) );
    }
}
