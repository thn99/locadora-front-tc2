import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from 'src/app/Client';
import { ClientService } from 'src/app/services/client.service';

import { BirthDatePipePipe } from 'src/app/pipes/birth-date-pipe.pipe';
import { PhonePipePipe } from 'src/app/pipes/phone-pipe.pipe';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
})
export class ClientFormComponent implements OnInit {
  clientForm: FormGroup;
  birthDatePipe: BirthDatePipePipe = new BirthDatePipePipe();
  phonePipe: PhonePipePipe = new PhonePipePipe();
  client: Client = {
    name: undefined,
    sex: undefined,
    birthDate: undefined,
    phone: undefined,
    adress: undefined,
    isAtendente: undefined,
  };

  constructor(private web: ClientService, private route: ActivatedRoute) {}

  startForm() {
    this.clientForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      sex: new FormControl(null, [Validators.required]),
      birthDate: new FormControl(null, [
        Validators.required,
        Validators.pattern(/\d{8}/),
        Validators.maxLength(8),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(13),
      ]),
      adress: new FormControl(null, [Validators.required]),
      isAtendente: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    //const formattedDate = this.birthDatePipe.transform(this.clientForm.get('birthDate').value);

    if (this.clientForm.valid) {
      const date = this.birthDatePipe.transform(
        this.clientForm.get('birthDate').value
      );

      const dateSplits = date.split('/');
      const formattedDate = new Date(
        `${dateSplits[1]}-${dateSplits[0]}-${dateSplits[2]}`
      );
      this.client.name = this.clientForm.get('name').value;
      this.client.sex = Number(this.clientForm.get('sex').value);
      this.client.birthDate = formattedDate.getTime();
      this.client.phone = this.clientForm.get('phone').value;
      this.client.adress = this.clientForm.get('adress').value;
      this.client.isAtendente =
        this.clientForm.get('isAtendente').value == 1 ? true : false;

      this.web.registerClient(this.client).subscribe((res) => {
        if (res.ok) alert('Cadastrado');
        else alert('Erro');
        this.web.getAllPeople();
      });
    }
  }

  onSubmitUpdate() {
    if (this.clientForm.valid) {
      const date = this.birthDatePipe.transform(
        this.clientForm.get('birthDate').value
      );
      const dateSplits = date.split('/');
      const formattedDate = new Date(
        `${dateSplits[1]}-${dateSplits[0]}-${dateSplits[2]}`
      );
      this.client._id = this.getUrlId();
      this.client.name = this.clientForm.get('name').value;
      this.client.sex = Number(this.clientForm.get('sex').value);
      this.client.birthDate = formattedDate.getTime();
      this.client.phone = this.clientForm.get('phone').value;
      this.client.adress = this.clientForm.get('adress').value;
      this.client.isAtendente =
        this.clientForm.get('isAtendente').value == 1 ? true : false;

      this.web.updateClient(this.client).subscribe((res) => {
        if (res.ok) alert('Cadastrado');
        else alert('Erro');
        this.web.getAllPeople();
      });
    }
  }

  isEditing(): boolean {
    if (this.route.snapshot.paramMap.get('id')) {
      return true;
    }
    return false;
  }

  getUrlId(): string {
    if (this.route.snapshot.paramMap.get('id')) {
      return this.route.snapshot.paramMap.get('id');
    }
    return undefined;
  }

  getEditingPerson() {
    this.route.queryParams.subscribe((param) => {
      const name = param['name'];
      const birthDate = param['birth'];
      const phone = param['phone'];
      const adress = param['adress'];

      const sanitizedBirth = new Date(Number(birthDate))
        .toLocaleDateString()
        .replace(/\//g, '');

      this.fillEditingForm(name, sanitizedBirth, phone, adress);
    });
  }

  fillEditingForm(
    name: string,
    birthDate: string,
    phone: string,
    adress: string
  ) {
    this.clientForm = new FormGroup({
      name: new FormControl(name, [Validators.required]),
      sex: new FormControl(null, [Validators.required]),
      birthDate: new FormControl(birthDate, [
        Validators.required,
        Validators.pattern(/\d{8}/),
        Validators.maxLength(8),
      ]),
      phone: new FormControl(phone, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(13),
      ]),
      adress: new FormControl(adress, [Validators.required]),
      isAtendente: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    if (this.isEditing()) {
      this.getEditingPerson();
    } else {
      this.startForm();
    }
  }
}
