import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/shared/models/contact';
import { ContactService } from 'src/app/shared/services/data/contact.service';

@Component({
  selector: 'app-contacts-edit',
  templateUrl: './contacts-edit.component.html',
  styleUrls: ['./contacts-edit.component.scss']
})
export class ContactsEditComponent implements OnInit {

  contactFG: FormGroup;
  contact: Contact = {
    id: '',
    FullName: '',
    Telephone: '',
    Email: '',
    Sujet: '',
    Message: '',
    Created: null,
    Confirmation: ''
  }

  updateFiche;

  loading = false;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private contactService: ContactService
              ) {
      this.contactFG = this.formBuilder.group({
        id: ['', Validators.required],
        FullName: ['', Validators.required],
        Telephone: ['', Validators.required],
        Email: [''],
        Sujet: ['', Validators.required],
        Message: ['', Validators.required],
      })
     }


  ngOnInit(): void {
    const id: string = this.route.snapshot.params.id;
    this.getFiche(id);

      // For Vue detail TItle Nom du patient
      this.getDetails(id);
    }
  
  // Vue detail pour fiche Title
    getDetails(id: string): void {
      this.contactService.getOneContact(id).subscribe(fi => {
        this.contact = fi;
      });
    }

  // Applique la mis a jour
  setFicheData(value) {
    this.updateFiche.FullName = value.FullName;
    this.updateFiche.Telephone = value.Telephone;
    this.updateFiche.Email = value.Email;
    this.updateFiche.Sujet = value.Sujet;
    this.updateFiche.Message = value.Message;
    this.updateFiche.Confirmation = value.Confirmation;;
  }

    // Cette fonction recupere les donnees qui existe deja par id
    getFiche(id) {
      this.contactService.getCollection$(ref => ref.where('id', '==' , id)).subscribe(fiches => {
        this.updateFiche = fiches[0];

        this.contactFG.patchValue({
          FullName: this.updateFiche.FullName,
          Telephone: this.updateFiche.Telephone,
          Email: this.updateFiche.Email,
          Sujet: this.updateFiche.Sujet,
          Message: this.updateFiche.Message,
          Confirmation: this.updateFiche.Confirmation
        });

    }, err => {
      this.errorMessage = err;
    });
  }


  // Submit data on database
  update() {
    if (this.contactFG.valid) {
      // this.loading = true;
      this.setFicheData(this.contactFG.value);
      this.contact.Confirmation = "NON LU"
      this.contactService.update(this.updateFiche).then(res => {
        this.loading = false;
        this.router.navigateByUrl('/admin/contacts/contacts-list');
        console.log('Contact Mis à jour!');
      }).then((res => {
        console.log(res);
        console.log('Contact enregistrée!');
      }));
    } else {
      this.markFormGroupTouched(this.contactFG);
    }

  }


  markFormGroupTouched(formGroup: FormGroup) {
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    (<any> Object).values(formGroup.controls).forEach(control => {
      if (control.controls) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

}
