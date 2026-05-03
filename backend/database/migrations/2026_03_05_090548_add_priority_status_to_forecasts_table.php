<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('forecasts', function (Blueprint $table) {
            $table->enum('priority_status', ['high', 'medium', 'low'])->default('medium')->after('reorder_point');  // Adds after reorder for clean schema
        });
    }

    public function down()
    {
        Schema::table('forecasts', function (Blueprint $table) {
            $table->dropColumn('priority_status');
        });
    }
};