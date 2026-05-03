<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
    Schema::create('items', function (Blueprint $table) {
        $table->id();
        $table->string('name', 100);
        $table->integer('qty');
        $table->string('qr_code', 200)->unique();
        $table->timestamps(); // adds created_at & updated_at - harmless extra
    });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('items');
    }
}
