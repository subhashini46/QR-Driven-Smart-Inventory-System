<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDeptIdAndPriorityToTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
{
    Schema::table('transactions', function (Blueprint $table) {
        $table->foreignId('dept_id')->nullable()->constrained()->onDelete('cascade');
        $table->enum('priority_status', ['high', 'medium', 'low'])->default('medium');
    });
}

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('transactions', function (Blueprint $table) {
            //
        });
    }
}
