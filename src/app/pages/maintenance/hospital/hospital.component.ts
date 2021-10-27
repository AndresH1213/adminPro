import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';

import { HospitalService } from '../../../services/hospital.service';
import { ModalImageService } from '../../../services/modal-image.service';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styles: [
  ]
})
export class HospitalComponent implements OnInit, OnDestroy {

  public hospitals: Hospital[] = [];
  public loading: boolean = true;
  private imgSubs!: Subscription;
  public hospitalsTemp: Hospital[] = [];

  constructor(private hospitalSV: HospitalService,
              private modal: ModalImageService,
              private searchSV: SearchService) { }
  
  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  ngOnInit() {
    this.loadHospitals();

    this.imgSubs = this.modal.newImage.pipe(
      delay(100)
    ).subscribe(img => this.loadHospitals())
  }

  loadHospitals() {
    this.loading = true;

    this.hospitalSV.loadHospitals().subscribe(hospitals => {
      this.loading = false;
      this.hospitalsTemp = [...hospitals];
      this.hospitals = hospitals;
    })
  }

  saveChanges(hospital: Hospital) {
    this.hospitalSV.updateHospital(hospital._id!, hospital.name).subscribe(resp => {
      Swal.fire('Updated', hospital.name, 'success')
    })
  }

  deleteHospital( hospital: Hospital) {
    this.hospitalSV.deleteHospital(hospital._id!).subscribe(resp => {
      this.loadHospitals();
      Swal.fire('Deleted', hospital.name, 'success');
    })
  }

  async openSwal() {
    const { value = '' } = await Swal.fire<string>({
      input: 'text',
      inputLabel: 'Create Hospital',
      inputPlaceholder: 'Name of the new Hospital',
      showCancelButton: true
    });

    if (value!.trim().length > 0) {
      this.hospitalSV.createHospital( value! )
        .subscribe((resp:any) => {
          this.hospitals.push( resp.hospital )
        })
    }
  }

  openModal(hospital: Hospital) {
    this.modal.openModal('hospitals', hospital._id!, hospital.img);
  }

  search(term: string): any {
    if (term.length <= 0) {
      return (this.hospitals = this.hospitalsTemp);
    }

    // this.searchSV.search('hospitals', term)
    this.searchSV.search('hospitals', term).subscribe((resp) => {
      this.hospitals = resp;
    });
  }

}
