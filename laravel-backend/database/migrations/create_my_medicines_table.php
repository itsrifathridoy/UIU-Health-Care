<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('my_medicines', function (Blueprint $table) {
            $table->increments('id');  // Primary key
            $table->unsignedBigInteger('user_id');  // User ID
            $table->unsignedInteger('medicine_id');  // Medicine ID
            $table->string('dosage_time');
            $table->string('schedule');
            $table->timestamps();  // for created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('my_medicines');
    }
};