<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Request extends Model {
    protected $fillable = ['dept_id', 'item_id', 'qty_request', 'status'];
}