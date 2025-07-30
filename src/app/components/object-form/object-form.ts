import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Api, ApiObject } from '../../services/api';

@Component({
  selector: 'app-object-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './object-form.html',
  styleUrls: ['./object-form.css']
})
export class ObjectForm implements OnInit {
  objectForm: FormGroup;
  isEditMode = false;
  objectId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: Api,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.objectForm = this.fb.group({
      name: ['', Validators.required],
      color: [''],
      capacity: [''],
      price: [null]
    });
  }

  ngOnInit(): void {
    this.objectId = this.route.snapshot.paramMap.get('id');
    if (this.objectId) {
      this.isEditMode = true;
      this.apiService.getObjectById(this.objectId).subscribe(object => {
        // Usamos patchValue para preencher o formulário com os dados do objeto
        this.objectForm.patchValue({
          name: object.name,
          ...object.data // Espalha as propriedades de 'data' no formulário
        });
      });
    }
  }

  onSubmit(): void {
    if (this.objectForm.invalid) {
      return;
    }

    const formData = this.objectForm.value;
    const objectPayload = {
      name: formData.name,
      data: {
        color: formData.color,
        capacity: formData.capacity,
        price: formData.price
      }
    };

    if (this.isEditMode && this.objectId) {
      this.apiService.updateObject(this.objectId, objectPayload).subscribe(() => {
        this.router.navigate(['/objects']);
      });
    } else {
      this.apiService.createObject(objectPayload).subscribe(() => {
        this.router.navigate(['/objects']);
      });
    }
  }
}