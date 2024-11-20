# **UIU Health Care System**

A comprehensive healthcare management system for the United International University community, offering affordable and accessible healthcare services using Laravel, ReactJS, and InertiaJS.

---

## **Features**

- 📹 **Instant Video Consultation**: Book and attend virtual consultations with doctors.
- 🕒 **Doctor Appointment Scheduling**: Schedule in-person or virtual appointments with doctors.
- 💊 **24/7 Medicine Delivery**: Order medicines with delivery services within the university premises.
- 📈 **Health Monitoring**: Track vitals and monitor health progress.
- 📂 **Health Records**: Securely manage and access health records.
- 🔔 **Medicine Schedule Tracking**: Receive reminders for taking medicines and managing schedules.
- 📝 **Digital Prescriptions**: Doctors can issue and update digital prescriptions.
- 🚨 **Emergency Services**: Quick access to emergency healthcare support.

---

## **Tech Stack**

- **Frontend**: ReactJS with InertiaJS
- **Backend**: Laravel
- **Database**: MySQL
- **Other Tools**: Tailwind CSS, Axios

---
## **Project Structure**
```plaintext
/uiu-health-care-system
├── /app             # Backend application logic
├── /resources       # Frontend files (React, InertiaJS)
├── /public          # Public assets (CSS, JS, images)
├── /routes          # Application routes
├── /database        # Migrations and seeders
├── /config          # Application configuration files
└── README.md        # Project documentation
```
---
## **User Roles**

### **Admin**
- Manage users, doctor schedules, and pharmacy inventory.
- Generate reports on appointments, deliveries, and usage analytics.

### **Doctor**
- Provide virtual and in-person consultations.
- Issue digital prescriptions and update health records.

### **Pharmacist**
- Process medicine orders and manage inventory.
- Ensure timely delivery of medicines.

### **Patient**
- Book appointments, attend consultations, and access health records.
- Order medicines and track schedules.

---
## **Getting Started**

### **Prerequisites**
Ensure the following are installed on your system:

1. [Node.js](https://nodejs.org/)  
2. [Composer](https://getcomposer.org/)  
3. [MySQL](https://www.mysql.com/)  
4. [Git](https://git-scm.com/)  

### **Setup Instructions**


#### **Step 1: Clone the Repository**
```bash
git clone https://github.com/YourUsername/UIU-Health-Care-System.git
cd UIU-Health-Care-System
```

#### **Step 2: Install Laravel Backend Dependencies**
Run the following command to install PHP dependencies:
```bash
composer install
```
#### **Step 3: Install Frontend Dependencies**
Run the following command to install Node.js dependencies:
```bash
npm install
```
#### **Step 4: Configure Environment Variables**
1. Copy the `.env.example` file and rename it to `.env`:
```bash
cp .env.example .env
```
2. Open the `.env` file in a text editor and update the following configurations:
*Database Settings:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=uiu_healthcare
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
```

#### **Step 5: Generate Application Key**
Run the following command to generate a unique application key:
```bash
php artisan key:generate
```
#### **Step 6: Run Database Migrations and Seeders**
Set up the database schema and populate it with initial data:
```bash
php artisan migrate --seed
```
#### **Step 7: Build the Frontend**
Build the ReactJS frontend using InertiaJS:
```bash
npm run dev
```
#### **Step 8: Start the Application**
Start the Laravel development server:
```
php artisan serve
```
#### **Step 9: Access the Application**
Open your browser and navigate to:
```plaintext
http://localhost:8000
```

