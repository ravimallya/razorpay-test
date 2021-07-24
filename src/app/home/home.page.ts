import { Component, NgZone, OnInit } from '@angular/core';
import { AlertController, ToastController, NavController } from '@ionic/angular';

declare var RazorpayCheckout: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isPayment = true;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private navController: NavController,
    private ngZone: NgZone
    ) { }
  ngOnInit(): void {

  }
  payWithRazorpay() {
    const _this = this;
    //  console.log(this.totalCost);
    const options = {
      description: 'Payment towards Test interview booking',
      image: 'https://resources.mockii.com/icon.png',
      currency: "INR", // your 3 letter currency code
      key: 'rzp_test_xihDVb6utQJlTL', // your Key Id from Razorpay dashboard
      amount: 500 + '00', // Payment amount in smallest denomiation e.g. cents for USD
      name: 'Razorpay Test',
      prefill: {
        email: 'test@test.com',
        contact: '9876543210',
        name: 'Test'
      },
      theme: {
        color: '#F37254'
      },
      modal: {
        ondismiss: function () {
          // alert('dismissed')
        }
      }
    };

    var successCallback: any = (razorpay_payment_id) => {
      alert('payment_id: ' + razorpay_payment_id);
      this.ngZone.run(() => {
        this.isPayment = false;
      });

    }
    var cancelCallback: any = (error) => {
      alert(error.description + ' (Error ' + error.code + ')')
    }
    //RazorpayCheckout.on('payment.success', successCallback)
    // RazorpayCheckout.on('payment.cancel', cancelCallback)
    RazorpayCheckout.open(options, successCallback, cancelCallback)

 
  }
}
