<?php

namespace App\Http\Controllers\Patient;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientController extends Controller
{
    public function index()
    {
        return Inertia::render('Patient/Dashboard');
    }
    public function messages()
    {
        return Inertia::render('Patient/Messages');
    }
    public function appointments()
    {
        return Inertia::render('Patient/Appointments');
    }
    public function consultations()
    {
        return Inertia::render('Patient/Consultations');
    }
    public function medicines()
    {
        return Inertia::render('Patient/Medicines');
    }
    public function healthRecords()
    {
        return Inertia::render('Patient/HealthRecords');
    }
    public function payments()
    {
        return Inertia::render('Patient/Payments');
    }
    public function profile()
    {
        return Inertia::render('Patient/Profile');
    }
    public function bloodBank()
    {
        return Inertia::render('Patient/BloodBank');
    }
    public function settings()
    {
        return Inertia::render('Patient/Settings');
    }

}
