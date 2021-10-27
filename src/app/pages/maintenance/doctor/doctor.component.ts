import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Doctor } from 'src/app/models/doctor.model';

import { DoctorService } from '../../../services/doctor.service';
import { ModalImageService } from '../../../services/modal-image.service';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit, OnDestroy {

  public doctors!: Doctor[];
  public loading: boolean = true;
  private imagenSubs!: Subscription;

  constructor(private doctorSV: DoctorService,
              private modal: ModalImageService,
              private searchSV: SearchService) { }
  
  
  ngOnDestroy(): void {
    this.imagenSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.loadDoctors();

    this.imagenSubs = this.modal.newImage.pipe(
      delay(500)
    ).subscribe(resp => this.loadDoctors())
  }
  
  loadDoctors() {
    this.loading = true;
    this.doctorSV.loadDoctors().subscribe(doctors => {
      this.doctors = doctors
      this.loading = false;
    })
  }

  openModal(doctor: Doctor) {
    this.modal.openModal('doctors', doctor._id!, doctor.img);
  }

  search(term: string) {
    if (term.length <= 0) {
      return this.loadDoctors()
    }

    // this.searchSV.search('hospitals', term)
    this.searchSV.search('doctors', term).subscribe((resp) => {
      this.doctors = resp;
    });
  }

  deleteDoctor(doctor: Doctor) {

    Swal.fire({
      title: 'Delete Doctor?',
      text: `You are going to delete ${doctor.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorSV.deleteDoctor(doctor._id!).subscribe((resp) => {

          Swal.fire(
            'Deleted!',
            `Your doctor ${doctor.name} has been deleted.`,
            'success'
          );

          this.loadDoctors();
        });
      }
    });
  }

}
