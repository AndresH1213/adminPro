import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from '../../../models/hospital.model';
import { DoctorService } from '../../../services/doctor.service';
import { HospitalService } from '../../../services/hospital.service';

@Component({
  selector: 'app-doctor-component',
  templateUrl: './doctor-component.component.html',
  styles: [
  ]
})
export class DoctorComponentComponent implements OnInit {

  public doctorForm!: FormGroup;
  public hospitals: Hospital[] = [];

  public doctorSelected?: Doctor;
  public hospitalSelected!: Hospital;

  constructor(private fb: FormBuilder,
              private hospitalSV: HospitalService,
              private doctorSV: DoctorService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(( { id } ) => {
      this.loadDoctor(id);
    })

    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required]
    })

    this.loadHospital();

    this.doctorForm.get('hospital')?.valueChanges.subscribe(hospitalId => {
      this.hospitalSelected = this.hospitals.find( h => h._id === hospitalId )!;
    })
  }

  loadHospital() {
    this.hospitalSV.loadHospitals().subscribe((hospitals: Hospital[]) => {
      
      this.hospitals = hospitals
    })
  }

  loadDoctor(id: string) {
    if (id === 'new' ){return;}

    this.doctorSV.getDoctorById(id).subscribe((doctor: any):any => {
      if (!doctor) {return this.router.navigateByUrl(`/dashboard/doctors`)}

      const { name, hospital } = doctor;
      const { _id } = hospital;
      
      this.doctorSelected = doctor;

      this.doctorForm.setValue({ name , hospital: _id})

    })
  }

  saveDoctor() {

    const { name } = this.doctorForm.value

    if (this.doctorSelected) {
      // Update doctor
      const data = {
        ...this.doctorForm.value,
        _id: this.doctorSelected._id
      }
      console.log(data)
      this.doctorSV.updateDoctor( data ).subscribe(resp => {
        console.log(resp)
        Swal.fire('Updated', `${name} correctly updated`, 'success');
      })
    
    } else {
      // Create a new doctor
      this.doctorSV.createDoctor( this.doctorForm.value )
          .subscribe((resp: any) => {
            console.log(resp);
            Swal.fire('Created', `${name} correctly created`, 'success');
            this.router.navigateByUrl(`/dashboard/doctor/${resp.doctor._id}`)
          });
    }

  }

}
