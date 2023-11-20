import {CommonModule, NgFor} from '@angular/common';
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, NgModel} from '@angular/forms';
import {Product, Size} from 'src/app/core/services/product.service';

@Component({
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule],
  selector: 'app-admin-dashboard-page',
  templateUrl: './admin-dashboard-page.component.html',
  styleUrls: ['./admin-dashboard-page.component.css'],
})
export class AdminDashboardPageComponent {
  selected_size: Size = {
    size: '',
    price: 0,
    available: true,
  };
  product: Product = {
    category: '',
    id: 0,
    name: '',
    color_name: '',
    color_hex: '',
    currency: 'EUR',
    description: '',
    sizes: [
      {
        size: 'XS',
        price: 9.99,
        available: true,
      },
      {
        size: 'S',
        price: 10.99,
        available: true,
      },
      {
        size: 'M',
        price: 11.99,
        available: true,
      },
      {
        size: 'L',
        price: 12.99,
        available: true,
      },
      {
        size: 'XL',
        price: 13.99,
        available: true,
      },
      {
        size: 'XXL',
        price: 14.99,
        available: true,
      },
      {
        size: '3XL',
        price: 15.99,
        available: true,
      },
      {
        size: '4XL',
        price: 16.99,
        available: true,
      },
      {
        size: 'Juris',
        price: 17.99,
        available: true,
      },
    ],
    gender: '',
    brand: '',
    images: [],
  };

  constructor(private fb: FormBuilder) {}

  selectSize(item: Size) {
    this.selected_size = item;
  }

  formatPrice(item: any) {
    const value = parseFloat(item.price);
    if (!isNaN(value) && value >= 0) {
      // If the value is a number and non-negative, format to two decimal places
      item.price = value.toFixed(2);
    } else {
      // If the value is not a number or negative, set price to '0.00' and available to false
      item.price = '100.00';
      item.available = false;
    }
  }

  toggleAvailable(item: any) {
    item.available = !item.available;
    if (!item.available) {
      //   item.price = '0.00'; // Reset price if the item is not available
    }
  }

  onSubmit() {
    // Handle form submission
    console.log('Product Data:', this.product);
    // Here, you would add your logic to save data to Supabase
  }

  onFileChange(event:any) {
    if (event.target.files && event.target.files.length) {
      const files = event.target.files;
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.product.images.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }
}
