<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\HealthRecord;
use Inertia\Inertia;


class DoctorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $appointments = Appointment::with('user')
        ->where('doc_id', auth()->user()->id)
        ->get()
        ->map(function($appointment) {
            $appointment->user->health = HealthRecord::where('user_id', $appointment->user_id)->get();
            return $appointment;
        });
        

        return Inertia::render('Doctor/Dashboard', [
            'appointments' => $appointments,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function patient()
    {
        return Inertia::render('Doctor/Patient');
    }

    

    public function showPatient($id)
    {
        // Dummy data
        $patients = [
            1 => ['id' => 1, 'name' => 'Rifat Hridoy', 'age' => 25, 'type' => 'Student'],
            2 => ['id' => 2, 'name' => 'Jiyasmim Sinthiya', 'age' => 30, 'type' => 'Student'],
            3 => ['id' => 3, 'name' => 'Mithila Arunima', 'age' => 30, 'type' => 'Student'],
            4 => ['id' => 4, 'name' => 'Koushik Roy', 'age' => 20, 'type' => 'Faculty'],
        ];
    
        // Check if patient exists in dummy data
        if (!array_key_exists($id, $patients)) {
            abort(404, 'Patient not found');
        }
    
        $patient = $patients[$id];
    
        // Pass dummy data to Inertia
        return Inertia::render('Doctor/PatientDetailPage', [
            'patient' => $patient,
        ]);
    }
    
}
