<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/admin', function () {
    return Inertia::render('Admin/Dashboard');
})->middleware(['auth', 'verified','role:admin'])->name('admin');

Route::get('/admin/doctors', function () {
    return Inertia::render('Admin/Doctors');
})->middleware(['auth', 'verified','role:admin'])->name('admin.doctors');

Route::get('/doctor', function () {
    return Inertia::render('Doctor/Dashboard');
})->middleware(['auth', 'verified','role:doctor'])->name('doctor');

Route::get('/pharmacist', function () {
    return Inertia::render('Pharmacist/Dashboard');
})->middleware(['auth', 'verified','role:pharmacist'])->name('pharmacist');

//Route::get('/patient', function () {
//    return Inertia::render('Patient/Dashboard');
//})->middleware(['auth', 'verified','role:patient'])->name('patient');


//Route::middleware(['auth', 'verified','role:patient'])->group(function () {
//    Route::controller(PatientController::class, 'patient')->group(function () {
//        Route::prefix('patient')->group(function () {
//            Route::get('/',  'index')->name('patient');
//        });
//    });
//});







Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
require __DIR__.'/patient.php';
