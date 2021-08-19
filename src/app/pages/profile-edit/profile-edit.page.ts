import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { ProfileEditService } from 'src/app/services/profile-edit.service';
import { finalize } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { CameraPreview, CameraPreviewOptions } from '@ionic-native/camera-preview/ngx';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  private editProfileForm: FormGroup;
  isSubmitted = false;
  profile_id :any;
  profile: any;
  name: string = '';
  phone: string = '';
  email: string = '';
  address: string = '';
  image: string = '';
  galleryOptions: CameraOptions = {
    quality: 100,
    correctOrientation: true,
    allowEdit: false,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  cameraOptions: CameraOptions = {
    quality: 50,
    correctOrientation: true,
    allowEdit: false,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  profileImage: any;
  user_data: any;
  isLoading = false;
  base64Str: any;
  kbytes: number;
  showErrors = false;
  errors:any;
  token:string;
  constructor(
    private profileService: ProfileService,
    private profileEditService: ProfileEditService,
    private storage: Storage,
    private router: Router,
    private global: GlobalService,
    private actionSheet: ActionSheetController,
    private camera: Camera,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    private cameraPreview: CameraPreview
  ) {
    this.editProfileForm = this.formBuilder.group({
      user_name: ['', Validators.compose([
        Validators.required
      ])],
      user_email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ])],
      user_phone: ['', Validators.compose([
        Validators.maxLength(11)
      ])],
      user_address: ['', Validators.compose([
        Validators.maxLength(200)
      ])]
    });
  }

  ngOnInit() {
    this.storage.create();
    this.global.getFirebaseRefreshToken().then(token=>{
      console.log(token);
      this.token = token;
    });
  }

  ionViewWillEnter() {
    this.storage.get('profile id').then((profile_id) => {
      this.profile_id = profile_id;
      this.getProfileDetail(this.profile_id);
    })
  }

  get errorControl() {
    return this.editProfileForm.controls;
  }

  getProfileDetail(profile_id) {
    this.present('Loading... ');
    this.showErrors = false;
    this.profileService.getProfileDetail(profile_id,this.token)
      .pipe(
        finalize(() => {

        }))
      .subscribe(
        data => {
          this.profile = data;
          console.log(this.profile);
          this.name = this.profile.name;
          this.phone = this.profile.phone;
          this.email = this.profile.email;
          this.address = this.profile.address;
          if (this.profile.image === null) {
            this.image = "assets/images/profile.png";
          } else {
            this.image = this.global.s3_url + this.profile.image;
            console.log(this.image);
          }
        }, (error: any) => {
          console.log(error);
        }
      )
  }

  async takePictureBoth() {
    const actionSheet = await this.actionSheet.create({
      header: 'Choose Camera or Gallery',
      buttons: [{
        text: 'Gallery',
        icon: 'image',
        handler: () => {
          this.camera.getPicture(this.galleryOptions).then((imageData) => {
            console.log("getPicture : " + 'data:image/jpeg;base64,' + imageData);
            this.base64Str = imageData;

            if (this.calculateImageSize(this.base64Str) > 2000) {
              alert('Reduce the size of image');
              console.log('enter true' + this.calculateImageSize(this.base64Str));
  
            }else{
              this.profileImage = "data:image/jpeg;base64," + imageData;
              this.image = this.profileImage;
              console.log('enter false' + this.calculateImageSize(this.base64Str));
            }

          }, (err) => {
            console.log("getPicture error: " + err)
          });
        }
      }, {
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          this.camera.getPicture(this.cameraOptions).then((imageData) => {
            console.log("getPicture : " + 'data:image/jpeg;base64,' + imageData);

            this.base64Str = imageData;

            if (this.calculateImageSize(this.base64Str) > 5000) {
              console.log('enter true' + this.calculateImageSize(this.base64Str));
              alert('Reduce the size of image');
            }else{
              this.profileImage = "data:image/jpeg;base64," + imageData;
              this.image = this.profileImage;
              console.log('enter');
            }

          }, (err) => {
            console.log("getPicture error: " + err)
          });
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => { }
      }]
    });
    await actionSheet.present();
  }


  calculateImageSize(base64String) {
    let padding;
    let inBytes;
    let base64StringLength;
    if (base64String.endsWith('==')) { padding = 2; }
    else if (base64String.endsWith('=')) { padding = 1; }
    else { padding = 0; }

    base64StringLength = base64String.length;
    console.log(base64StringLength);
    inBytes = (base64StringLength * ( 3 / 4 ) ) - padding;
    console.log(inBytes);
    this.kbytes = inBytes / 1000;
    console.log(this.kbytes);
    return this.kbytes;
  }

  editProfile() {
    this.isSubmitted = true;
    this.showErrors = false;
    if (this.editProfileForm.invalid) {
      return false;
    } else {
      this.present('Loading... ')
      console.log('success');
      if (this.profileImage) {
        this.user_data = {
          name: this.editProfileForm.controls.user_name.value,
          email: this.editProfileForm.controls.user_email.value,
          phone: this.editProfileForm.controls.user_phone.value,
          address: this.editProfileForm.controls.user_address.value,
          profile: this.profileImage,
          oldProfile: this.profile.image
        };
      } else {
        this.user_data = {
          name: this.editProfileForm.controls.user_name.value,
          email: this.editProfileForm.controls.user_email.value,
          phone: this.editProfileForm.controls.user_phone.value,
          address: this.editProfileForm.controls.user_address.value
        };
      }
      console.log(this.user_data);
      this.profileEditService.updateProfile(this.profile_id, this.user_data,this.token)
        .pipe(finalize(() => {
          this.dismiss()
        }))
        .subscribe((data) => {
          console.log(data);
          this.router.navigate(['profile']);
        }, error => {
          this.showErrors = true;
          this.errors = error.error.errors;
          console.log(error.error.errors);
          this.dismiss()
        });
    }
  }

  async present(s) {
    this.isLoading = true;
    const loading = await this.loadingCtrl.create({
      message: s
    })
    loading.present().then(() => {
      setTimeout(() => {
        if (this.isLoading) {
          this.dismiss()
        }
      }, 5000);
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss();
  }

  async successAlert() {
    const alert = await this.alertCtrl.create({
      message: "Successfully Updated!",
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            this.navCtrl.pop()
          }
        }
      ]
    });
    await alert.present();
  }

  back(){
    this.router.navigate(['profile']);
  }

}
